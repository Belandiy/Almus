import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../hooks/useAppContext';

const StrategyScreen: React.FC = () => {
  const { strategyData } = useAppContext();

  if (!strategyData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-on-surface-variant">Загрузка стратегии...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-md py-lg md:py-xl gap-md md:gap-lg">
      {/* Left Column */}
      <div className="space-y-md md:space-y-lg">
        {/* Readiness Widget */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest/70 backdrop-blur-xl border border-surface-variant/50 rounded-2xl p-md flex flex-col items-center justify-center relative overflow-hidden shadow-ambient"
        >
          <h2 className="font-headline-md text-headline-md mb-md text-center">Готовность к карьере</h2>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle className="text-surface-variant stroke-current" cx="50" cy="50" fill="transparent" r="40" strokeWidth="10"></circle>
              <motion.circle 
                className="text-primary stroke-current drop-shadow-md" 
                cx="50" 
                cy="50" 
                fill="transparent" 
                r="40" 
                strokeWidth="10"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * strategyData.readiness) / 100 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                strokeLinecap="round"
                style={{ rotate: -90, originX: "50%", originY: "50%" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="font-display-lg text-display-lg text-primary"
              >
                {strategyData.readiness}%
              </motion.span>
            </div>
          </div>
          <p className="text-on-surface-variant text-center mt-md font-body-md">
            {strategyData.readiness > 70 ? 'Отличный результат!' : 'Хороший старт. Еще немного усилий!'}
          </p>
        </motion.section>

        {/* Skills Gap Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-lowest/70 backdrop-blur-xl border border-surface-variant/50 rounded-2xl p-md shadow-ambient"
        >
          <h3 className="font-headline-md text-headline-md mb-md flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary">code</span>
            Навыки
          </h3>
          <div className="space-y-md">
            {strategyData.skills.map((skill, idx) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-xs">
                  <span className="font-label-md text-label-md">{skill.name}</span>
                  <span className={`font-label-md text-label-md ${skill.isGap ? 'text-tertiary' : 'text-primary'}`}>
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                    className={`h-full ${skill.isGap ? 'bg-tertiary' : 'bg-primary'} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Salary Projection */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container-lowest/70 backdrop-blur-xl border border-surface-variant/50 rounded-2xl p-md shadow-ambient"
        >
          <h3 className="font-headline-md text-headline-md mb-md flex items-center gap-sm">
            <span className="material-symbols-outlined text-secondary">trending_up</span>
            Прогноз ЗП
          </h3>
          <div className="mt-sm space-y-md">
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Сейчас</span>
              <span className="font-headline-md text-headline-md">{strategyData.salaryProjection.current.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">6 месяцев</span>
              <span className="font-headline-md text-headline-md text-primary">{strategyData.salaryProjection.sixMonths.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">1 год</span>
              <span className="font-headline-md text-headline-md text-secondary">{strategyData.salaryProjection.oneYear.toLocaleString()} ₽</span>
            </div>
          </div>
        </motion.section>

        {/* Roles Carousel */}
        <section>
          <div className="flex justify-between items-end mb-md px-xs">
            <h2 className="font-headline-md text-headline-md">Подходящие роли</h2>
          </div>
          <div className="flex overflow-x-auto gap-md pb-sm no-scrollbar px-xs snap-x">
            {strategyData.roles.map((role) => (
              <motion.div 
                key={role.title}
                whileHover={{ scale: 1.02 }}
                className="bg-surface-container-lowest/70 backdrop-blur-xl border border-surface-variant/50 rounded-2xl p-md min-w-[200px] max-w-[300px] flex-shrink-0 snap-start flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-ambient"
              >
                <div>
                  <div className="flex justify-between items-start mb-sm">
                    <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-3xl">developer_mode</span>
                    </div>
                    <span className="bg-secondary-container/30 text-on-secondary-container px-2 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1">
                      {role.match}%
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md mb-xs">{role.title}</h3>
                  <p className="text-on-surface-variant font-body-md line-clamp-2">{role.description}</p>
                </div>
                <div className="mt-md flex gap-xs flex-wrap">
                  {role.skills.slice(0, 3).map(s => (
                    <span key={s} className="h-8 px-3 flex items-center bg-primary/10 text-primary rounded-full font-label-sm text-label-sm">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roadmap Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-lowest/70 backdrop-blur-xl border border-surface-variant/50 rounded-2xl p-md shadow-ambient"
        >
          <h3 className="font-headline-md text-headline-md mb-md flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary">route</span>
            План развития
          </h3>
          <div className="relative border-l-2 border-surface-variant ml-3 space-y-md pb-xs">
            {strategyData.roadmap
              .slice()
              .sort((a, b) => {
                const getMonth = (s: string) => {
                  const m = s.match(/\d+/);
                  return m ? parseInt(m[0]) : 0;
                };
                return getMonth(a.timeframe) - getMonth(b.timeframe);
              })
              .map((step, idx) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="relative pl-md"
              >
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${idx === 0 ? 'bg-secondary' : 'bg-surface-variant'}`}></div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide mb-xs">{step.timeframe}</div>
                <div className="bg-surface rounded-xl p-sm shadow-sm border border-surface-variant/50">
                  <h4 className="font-label-md text-label-md mb-1">{step.title}</h4>
                  <p className="font-body-md text-on-surface-variant text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default StrategyScreen;
