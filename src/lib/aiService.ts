import vacancies from '../data/vacancies.json';
import type { ChatMessage, UserProfile, StrategyData, SkillInfo, RoadmapStep, RoleMatch } from '../context/AppContext';

export const generateAiResponse = async (history: ChatMessage[], profile: UserProfile): Promise<{ content: string; options?: string[]; isReady?: boolean }> => {
  try {
    // We delegate most of the logic to the backend, 
    // but we can still handle the very first "ask name" if we want, 
    // although the backend is now ready for it too.
    
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history, profile }),
    });

    if (!response.ok) throw new Error('AI Server is not responding');
    
    const data = await response.json();
    
    // logic to detect if we should show the "Generate Strategy" button
    // The backend now provides options. If we see options like "Посмотреть план" or similar, 
    // or if the conversation is long enough.
    const isReady = data.content.toLowerCase().includes("стратег") || 
                    data.content.toLowerCase().includes("план") || 
                    history.length >= 8;

    return {
      content: data.content,
      options: data.options && data.options.length > 0 ? data.options : undefined,
      isReady: isReady || data.isReady
    };
  } catch (error) {
    console.error("AI Fetch error:", error);
    return {
      content: "Ментор временно недоступен. Давай я помогу тебе в демо-режиме. Расскажи, какой стек технологий тебе интересен?",
      options: ["Frontend", "Backend", "Fullstack", "Mobile"]
    };
  }
};

export const generateStrategy = async (profile: UserProfile, history: ChatMessage[]): Promise<StrategyData> => {
  try {
    const response = await fetch('http://localhost:8000/generate_strategy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history, profile }),
    });

    if (!response.ok) throw new Error('AI Strategy Server is not responding');
    
    return await response.json();
  } catch (error) {
    console.error("AI Strategy Fetch error:", error);
    // Fallback to local heuristic logic (previous implementation)
    return generateLocalStrategy(profile);
  }
};

const generateLocalStrategy = (profile: UserProfile): StrategyData => {
  const userSkills = (profile.currentSkills || []).map(s => s.toLowerCase());
  
  // 1. Find role matches based on skills and preferences
  const matches: RoleMatch[] = vacancies
    .map(v => {
      const matchingSkills = v.skills.filter(s => userSkills.includes(s.toLowerCase()));
      const matchPercent = Math.round((matchingSkills.length / v.skills.length) * 100);
      return {
        title: v.name,
        match: matchPercent,
        description: `Вакансия с упором на ${v.skills.slice(0, 2).join(', ')}.`,
        skills: v.skills
      };
    })
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  // 2. Identify Skill Gaps
  const topRoleSkills = matches[0]?.skills || [];
  const skills: SkillInfo[] = topRoleSkills.map(s => ({
    name: s,
    level: userSkills.includes(s.toLowerCase()) ? 80 : 20,
    isGap: !userSkills.includes(s.toLowerCase())
  }));

  // 3. Calculate Readiness
  const readiness = matches[0]?.match || 0;

  // 4. Generate Roadmap
  const gaps = skills.filter(s => s.isGap).map(s => s.name);
  const roadmap: RoadmapStep[] = [
    {
      title: "Фундамент",
      description: "Закрепление базовых знаний и работа над пробелами.",
      timeframe: "Месяц 1"
    },
    ...gaps.slice(0, 2).map((skill, index) => ({
      title: `Изучение ${skill}`,
      description: `Глубокое погружение в ${skill} и создание практического проекта.`,
      timeframe: `Месяц ${index + 2}`
    })),
    {
      title: "Подготовка к офферу",
      description: "Симуляция собеседований и финальная полировка портфолио.",
      timeframe: "Месяц 4"
    }
  ];

  const baseSalary = matches[0] ? vacancies.find(v => v.name === matches[0].title)?.salary || 80000 : 80000;
  
  return {
    readiness,
    skills,
    roles: matches,
    roadmap,
    salaryProjection: {
      current: baseSalary,
      sixMonths: Math.round(baseSalary * 1.25),
      oneYear: Math.round(baseSalary * 1.5)
    }
  };
};
