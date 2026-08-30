import React, { useState, useEffect } from 'react';

interface Project {
  id: number;
  company_name: string;
  title: string;
  description: string;
  budget: number;
  mode: string;
  required_skills: string[];
  status: string;
}

const ProjectsScreen: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // В реальном приложении здесь будет запрос к нашему FastAPI
    // Для демо используем те же мок-данные
    fetch('http://localhost:8000/projects')
      .then(res => res.json())
      .then(data => {
        if (data.projects) {
          setProjects(data.projects);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        // Fallback data if backend is not running
        setProjects([
          {
            id: 1,
            company_name: "TechStart Inc",
            title: "Разработка лендинга для SaaS",
            description: "Нужно разработать адаптивный лендинг на React/Tailwind по готовому дизайну в Figma.",
            budget: 20000,
            mode: "single_team",
            required_skills: ["react", "tailwind", "figma"],
            status: "open"
          },
          {
            id: 2,
            company_name: "DataGenius",
            title: "Парсинг каталога интернет-магазина",
            description: "Скрипт на Python для сбора цен с 3 конкурентов. Соревновательный режим.",
            budget: 15000,
            mode: "competition",
            required_skills: ["python", "beautifulsoup", "pandas"],
            status: "open"
          }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-md space-y-md fade-in pb-xl">
      <div className="bg-primary/10 rounded-2xl p-md border border-primary/20">
        <h1 className="text-title-lg font-bold text-on-surface mb-xs">Биржа проектов</h1>
        <p className="text-body-md text-on-surface-variant">
          Выполняйте реальные задачи от компаний, зарабатывайте и закрывайте пробелы в своих навыках.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-xl">
          <div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-sm">
          {projects.map((project) => (
            <div key={project.id} className="bg-surface-container-low rounded-xl p-md border border-surface-variant/30 hover:border-primary/50 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-sm">
                <div>
                  <h3 className="text-label-lg font-bold text-on-surface">{project.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{project.company_name}</p>
                </div>
                <div className="bg-green-100 text-green-800 text-[11px] font-bold px-2 py-1 rounded-full whitespace-nowrap">
                  {project.budget.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              
              <p className="text-body-sm text-on-surface mb-md line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-md">
                {project.required_skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-surface-variant/50 rounded-md text-[10px] font-medium text-on-surface-variant">
                    {skill}
                  </span>
                ))}
                {project.mode === 'competition' && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-md text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">emoji_events</span>
                    Конкурс
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-on-primary py-2 rounded-full text-label-md font-bold active:scale-95 transition-transform">
                  Откликнуться
                </button>
                <button className="px-4 bg-surface-variant text-on-surface-variant rounded-full text-label-md font-bold active:scale-95 transition-transform flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsScreen;
