import React, { useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { X, Heart, Bookmark } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { JobCard } from '../components/jobs/JobCard';
import vacancies from '../data/vacancies.json';
import { cn } from '../lib/utils';
import type { Job } from '../data/mockJobs';

const JobsScreen: React.FC = () => {
  const { toggleLikedJob, toggleRejectedJob, likedJobs, strategyData, userProfile } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dynamic generation of jobs based on real vacancies.json and AI Strategy
  const realJobs = useMemo(() => {
    if (!strategyData) return [];

    // Извлекаем навыки, которые у пользователя уже есть (isGap === false)
    const hasSkills = strategyData.skills
      .filter(s => !s.isGap)
      .map(s => s.name.toLowerCase());
    
    // Извлекаем названия ролей, которые предложил ИИ
    const suggestedRoleTitles = strategyData.roles.map(r => r.title.toLowerCase());

    return vacancies
      .map((v, index) => {
        // Проверяем совпадение навыков
        const matchedSkills = v.skills.filter(vs => 
          hasSkills.some(hs => vs.toLowerCase().includes(hs) || hs.includes(vs.toLowerCase()))
        );
        
        const missingSkills = v.skills.filter(vs => !matchedSkills.includes(vs));
        
        const matchPercentage = Math.round((matchedSkills.length / v.skills.length) * 100);

        // Рассчитываем приоритет: совпадение по роли дает огромный бонус
        const isRoleMatch = suggestedRoleTitles.some(st => 
          v.name.toLowerCase().includes(st) || st.includes(v.name.toLowerCase())
        );
        
        const priorityScore = matchPercentage + (isRoleMatch ? 200 : 0);

        return {
          id: `real-${index}`,
          company: (v as any).company_name || 'IT Компания',
          role: v.name,
          salary: `${v.salary.toLocaleString()} ₽`,
          location: index % 3 === 0 ? 'Удаленно' : 'Москва',
          matchPercentage,
          matchedSkills: matchedSkills,
          missingSkills: missingSkills,
          priorityScore
        } as Job & { priorityScore: number };
      })
      .filter(job => job.priorityScore > 50) // Показываем только хоть немного релевантные
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(0, 15); // Топ 15 вакансий
  }, [strategyData]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Background card animations
  const nextJobScale = useTransform(x, [-100, 0, 100], [1, 0.95, 1]);
  const nextJobY = useTransform(x, [-100, 0, 100], [0, 16, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 100) {
      swipe('right');
    } else if (info.offset.x < -100) {
      swipe('left');
    }
  };

  const swipe = useCallback((direction: 'left' | 'right') => {
    const job = realJobs[currentIndex];
    if (!job) return;

    if (direction === 'right') {
      toggleLikedJob(job.id);
    } else {
      toggleRejectedJob(job.id);
    }

    setCurrentIndex((prev) => prev + 1);
    x.set(0);
  }, [currentIndex, realJobs, toggleLikedJob, toggleRejectedJob, x]);

  const currentJob = realJobs[currentIndex];
  const nextJob = realJobs[currentIndex + 1];
  const followingJob = realJobs[currentIndex + 2];

  return (
    <div className="flex-1 relative w-full flex flex-col items-center justify-center px-md pt-lg min-h-full bg-background text-on-background font-body-md antialiased select-none overflow-y-auto no-scrollbar">
      <AnimatePresence mode="popLayout">
          {!currentJob ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="empty"
              className="text-center p-md"
            >
              <h2 className="font-headline-md mb-sm">Больше нет вакансий</h2>
              <p className="text-on-surface-variant">Заходи позже за новыми рекомендациями!</p>
              <button 
                onClick={() => setCurrentIndex(0)}
                className="mt-md text-primary font-label-md"
              >
                Начать сначала (Демо)
              </button>
            </motion.div>
          ) : (
            <div className="relative w-full max-w-[400px] aspect-[3/4] flex items-center justify-center">
              {/* Background Card 2 */}
              {followingJob && (
                <div className="absolute w-[calc(100%-32px)] h-full bg-surface-container-lowest rounded-3xl shadow-ambient border border-surface-variant/50 p-md opacity-30 scale-90 translate-y-10 z-10">
                   <div className="w-full h-full bg-surface-container-high rounded-xl animate-pulse" />
                </div>
              )}

              {/* Background Card 1 */}
              {nextJob && (
                <motion.div 
                  style={{
                    scale: nextJobScale,
                    y: nextJobY,
                  }}
                  className="absolute w-[calc(100%-16px)] h-full bg-surface-container-lowest rounded-3xl shadow-ambient border border-surface-variant/50 p-md z-20"
                >
                  <JobCard job={nextJob} x={x} />
                </motion.div>
              )}

              {/* Front Card */}
              <motion.div
                key={currentJob.id}
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="absolute w-full h-full z-30 cursor-grab active:cursor-grabbing origin-bottom"
              >
                <JobCard job={currentJob} x={x} isFront />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Floating Action Buttons */}
        {currentJob && (
          <div className="absolute bottom-6 w-full max-w-[400px] px-md flex justify-between items-center z-40">
            <button 
              onClick={() => swipe('left')}
              aria-label="Пропустить вакансию"
              className="w-16 h-16 rounded-full bg-surface-container-lowest shadow-ambient border-2 border-error text-error flex items-center justify-center transition-transform active:scale-90 hover:bg-error-container/20"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button 
              aria-label={likedJobs.includes(currentJob.id) ? "Удалить из закладок" : "Сохранить в закладки"}
              className="w-12 h-12 rounded-full bg-surface-container-lowest shadow-ambient border border-surface-variant text-outline flex items-center justify-center transition-transform active:scale-90 hover:bg-surface-variant/50"
            >
              <Bookmark className={cn("w-6 h-6", likedJobs.includes(currentJob.id) && "fill-primary text-primary")} />
            </button>
            
            <button 
              onClick={() => swipe('right')}
              aria-label="Лайкнуть вакансию"
              className="w-16 h-16 rounded-full bg-surface-container-lowest shadow-ambient border-2 border-secondary text-secondary flex items-center justify-center transition-transform active:scale-90 hover:bg-secondary-container/20"
            >
              <Heart className="w-8 h-8" />
            </button>
          </div>
        )}
    </div>
  );
};

export default JobsScreen;
