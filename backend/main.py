from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from openai import AsyncOpenAI
import json
import re

app = FastAPI()

# Разрешаем запросы с фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Настройки для LM Studio / OpenAI API
LM_STUDIO_URL = os.getenv("LM_STUDIO_URL", "http://localhost:1234/v1")
LM_STUDIO_API_KEY = os.getenv("LM_STUDIO_API_KEY", "lm-studio")

client = AsyncOpenAI(base_url=LM_STUDIO_URL, api_key=LM_STUDIO_API_KEY)

# Пути к файлам (используем переменные окружения для гибкости в Docker)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VACANCIES_PATH = os.getenv("VACANCIES_PATH", os.path.join(BASE_DIR, "..", "src", "data", "vacancies.json"))

# Загрузка вакансий
with open(VACANCIES_PATH, "r", encoding="utf-8") as f:
    vacancies_data = json.load(f)

class ChatRequest(BaseModel):
    messages: list
    profile: dict

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        profile = request.profile
        
        # Системный промпт: строгая последовательность вопросов для сбора данных
        system_prompt = f"""Ты — AI Career Strategist, профессиональный карьерный ментор. Твоя задача — собрать данные для карьерного плана.
        
        ТВОЙ АЛГОРИТМ (спрашивай по одному пункту за раз):
        1. Целевая роль: Узнай, кем именно хочет работать человек (например, Data Analyst или Frontend).
        2. Опыт: Спроси про текущий уровень (студент, самообучение, есть коммерческий опыт).
        3. Навыки: Спроси про конкретный стек технологий.
        
        ПРАВИЛА ОБЩЕНИЯ:
        - Обращайся к пользователю на "Вы". 
        - НИКОГДА не используй слово "юзер" или "пользователь" в общении. Говори естественно.
        - Если информация о роли уже есть в истории — НЕ спрашивай ее снова.
        - Будь кратким и поддерживающим (1-2 предложения).
        - В конце сообщения ОБЯЗАТЕЛЬНО добавь варианты ответов в формате: [Вариант 1 | Вариант 2]
        - Когда узнаешь роль, опыт и навыки, скажи: "Отлично! Я готов составить Ваш персональный карьерный план."
        """
        
        # Llama 3 Instruct Prompt Format
        prompt = f"<|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|>"
        
        for msg in request.messages:
            llama_role = "user" if msg['role'] == 'user' else "assistant"
            prompt += f"<|start_header_id|>{llama_role}<|end_header_id|>\n\n{msg['content']}<|eot_id|>"
            
        prompt += "<|start_header_id|>assistant<|end_header_id|>\n\n"

        # Генерация ответа
        output = llm(
            prompt,
            max_tokens=400,
            stop=["<|eot_id|>", "<|start_header_id|>"],
            echo=False,
            temperature=0.7
        )
        
        full_text = output["choices"][0]["text"].strip()
        
        # Ультра-мощный парсинг кнопок
        content = full_text
        options = []
        
        bracket_match = re.search(r'[\[<]([^\]>]+?\|[^\]>]+?)[\]>]', full_text)
        if bracket_match:
            options_raw = bracket_match.group(1)
            options = [opt.strip() for opt in re.split(r'[|;]', options_raw) if opt.strip()]
            content = (full_text[:bracket_match.start()] + full_text[bracket_match.end():]).strip()
        else:
            pipe_pattern = r'([^.!?\n]+?\|[^.!?\n]+(?:\|[^.!?\n]+)*)'
            pipe_match = re.search(pipe_pattern, full_text)
            if pipe_match:
                options_raw = pipe_match.group(1)
                options = [opt.strip() for opt in options_raw.split('|') if opt.strip()]
                content = (full_text[:pipe_match.start()] + full_text[pipe_match.end():]).strip()

        content = re.sub(r'(?:Например|Выберите|Варианты|Кнопки):?\s*$', '', content, flags=re.IGNORECASE).strip()
        content = re.sub(r'\s{2,}', ' ', content)
        content = content.rstrip(': ,')

        return {
            "content": content if content else full_text,
            "options": options[:6]
        }
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate_strategy")
async def generate_strategy(request: ChatRequest):
    try:
        profile = request.profile
        messages = request.messages
        
        # 1. Собираем историю диалога
        history_text = "\n".join([f"{m['role']}: {m['content']}" for m in messages])
        
        # 2. Интеллектуальный подбор вакансий
        # Ключевые слова для поиска (роли и технологии)
        search_query = (history_text + " " + json.dumps(profile)).lower()
        
        # Маппинг русских терминов на английские для лучшего поиска
        translation_map = {
            "аналитик": "analyst",
            "разработчик": "developer",
            "дизайнер": "designer",
            "тестировщик": "qa",
            "данные": "data",
            "питон": "python",
            "скл": "sql",
            "фронтенд": "frontend",
            "бэкенд": "backend"
        }
        
        # Расширяем поисковый запрос переводами
        for ru, en in translation_map.items():
            if ru in search_query:
                search_query += f" {en}"

        relevant_vacancies = []
        for v in vacancies_data:
            # Текст вакансии для поиска
            v_text = (v['name'] + " " + " ".join(v['skills'])).lower()
            
            # Считаем релевантность
            score = 0
            # Если совпадает название роли
            important_keywords = ["аналитик", "analyst", "data", "python", "sql", "frontend", "backend", "java", "go", "ios", "android", "qa", "тестировщик", "дизайнер", "ui/ux", "devops"]
            for kw in important_keywords:
                if kw in search_query and kw in v_text:
                    score += 15
            
            # Совпадение технологий
            tech_keywords = ["react", "vue", "angular", "django", "fastapi", "spring", "docker", "kubernetes", "pandas", "numpy", "matplotlib", "seaborn", "scikit-learn", "pytorch", "tensorflow", "tableau", "power bi", "excel", "airflow", "kafka", "pyspark", "figma", "swift", "kotlin"]
            for tech in tech_keywords:
                if tech in search_query and tech in v_text:
                    score += 5
            
            # Бонус за точное совпадение слов из последних сообщений пользователя
            user_last_msgs = " ".join([m['content'] for m in messages if m['role'] == 'user'][-2:]).lower()
            if any(word in v_text for word in user_last_msgs.split() if len(word) > 3):
                score += 10
            
            if score > 0:
                relevant_vacancies.append((score, v))
        
        # Сортируем по релевантности и берем топ-15
        relevant_vacancies.sort(key=lambda x: x[0], reverse=True)
        final_vacancies = [v for score, v in relevant_vacancies[:15]]
        
        # Если ничего не нашли, берем дефолтные
        if not final_vacancies:
            final_vacancies = vacancies_data[:15]

        system_prompt = f"""Ты — Senior IT Career Mentor & HR Analyst. Твоя задача — составить ПЕРСОНАЛЬНУЮ стратегию развития.
        
        ДАННЫЕ ПОЛЬЗОВАТЕЛЯ:
        {history_text}
        
        ПРОФИЛЬ: {json.dumps(profile, ensure_ascii=False)}
        
        СПИСОК РЕАЛЬНЫХ ВАКАНСИИ ДЛЯ МЭТЧИНГА:
        {json.dumps(final_vacancies, ensure_ascii=False)}
        
        ИНСТРУКЦИИ:
        1. ЦЕЛЬ: Определи желаемую роль из истории (например, если просят Data Analyst, НЕ ПРЕДЛАГАЙ Frontend). 
        2. READINESS: Рассчитай честный % готовности. Сравни знания человека ({profile.get('currentSkills', [])} и упомянутое в чате) с вакансиями.
           - Если это новичок/студент без опыта — готовность 10-25%.
           - Не ставь 60% без веских причин.
        3. SKILLS: 5-7 навыков для ЦЕЛЕВОЙ роли. 
           - Укажи текущий уровень (level 0-100) на основе его слов. 
           - Если он сказал "знаю питон", ставь 40-50%. Если не упоминал навык — 0-10%.
           - isGap=true, если уровень низкий.
           - СТРОГО ЗАПРЕЩЕНО выдумывать React/JS, если об этом не было речи.
        4. ROLES: Выбери 3 вакансии ТОЛЬКО из списка выше. 
           - В description пиши кратко, обращаясь на "Вы" (например, "Вам подходит, так как...").
           - ИЗБЕГАЙ слов "юзер", "пользователь", "клиент".
        5. ROADMAP: План обучения. Каждый шаг должен закрывать конкретный Gap. Обращайся на "Вы".
        6. SALARY: На основе цифр в списке вакансий.
        
        ОТВЕТЬ СТРОГО В JSON (без лишнего текста):
        {{
          "readiness": число,
          "skills": [{{ "name": "название", "level": число, "isGap": boolean }}],
          "roles": [{{ "title": "название", "match": число, "description": "почему подходит", "skills": ["навык1"] }}],
          "roadmap": [{{ "title": "шаг", "description": "детали", "timeframe": "Месяц X" }}],
          "salaryProjection": {{ "current": число, "sixMonths": число, "oneYear": число }}
        }}
        """
        
        prompt = f"<|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n{{"

        output = llm(
            prompt,
            max_tokens=1536,
            stop=["<|eot_id|>", "<|start_header_id|>"],
            echo=False,
            temperature=0.1
        )
        
        json_text = "{" + output["choices"][0]["text"].strip()
        
        try:
            strategy_data = json.loads(json_text)
            return strategy_data
        except:
            json_match = re.search(r'(\{.*\})', json_text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group(1))
            raise ValueError("AI failed to generate valid JSON")

    except Exception as e:
        print(f"Strategy Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
