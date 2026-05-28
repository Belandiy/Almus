import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Building2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import type { Job } from '../../data/mockJobs';

interface JobCardProps {
  job: Job;
  x: MotionValue<number>;
  isFront?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, x, isFront = false }) => {
  // Overlays opacity
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);
  
  // Rotation for the text overlays
  const likeRotate = useTransform(x, [0, 100], [0, 12]);
  const nopeRotate = useTransform(x, [0, -100], [0, -12]);

  return (
    <div className="relative w-full h-full bg-surface-container-lowest rounded-3xl shadow-ambient-lg border border-surface-variant/30 flex flex-col p-md overflow-hidden">
      {/* Company & Role Header */}
      <div className="flex items-start gap-sm mb-md">
        <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 border border-surface-variant/50">
          <Building2 className="w-8 h-8 text-outline-variant" />
        </div>
        <div className="flex flex-col">
          <h2 className="font-headline-md text-headline-md text-on-surface leading-tight mb-xs">
            {job.role}
          </h2>
          <p className="font-label-md text-label-md text-outline">
            {job.company} • {job.location}
          </p>
        </div>
      </div>

      {/* Salary & Match Badge */}
      <div className="flex items-center justify-between mb-lg border-b border-surface-variant/50 pb-sm">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-xs">
            Ожидаемая З/П
          </span>
          <span className="font-headline-md text-headline-md text-primary font-bold">
            {job.salary}
          </span>
        </div>
        <div className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-md flex items-center gap-xs shadow-sm">
          <Sparkles className="w-4 h-4" />
          {job.matchPercentage}% Совпадение
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-sm">Анализ навыков</h3>
        <div className="flex-1 overflow-y-auto pr-xs space-y-md no-scrollbar">
          {/* Matched Skills */}
          <div>
            <div className="flex items-center gap-xs mb-xs text-secondary font-label-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Совпадает ({job.matchedSkills.length})</span>
            </div>
            <div className="flex flex-wrap gap-xs">
              {job.matchedSkills.map(skill => (
                <span key={skill} className="bg-primary/10 text-primary-fixed-variant px-3 py-1 rounded-full font-label-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Missing Skills */}
          <div>
            <div className="flex items-center gap-xs mb-xs text-error font-label-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Нужно подтянуть ({job.missingSkills.length})</span>
            </div>
            <div className="flex flex-wrap gap-xs">
              {job.missingSkills.map(skill => (
                <span key={skill} className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full font-label-sm opacity-80">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay indicators for swipe direction */}
      {isFront && (
        <>
          <motion.div 
            style={{ opacity: likeOpacity }}
            className="absolute inset-0 rounded-3xl pointer-events-none flex items-center justify-center p-md z-40"
          >
            <div className="w-full h-full border-4 border-secondary rounded-2xl flex items-start justify-end p-sm">
              <motion.span 
                style={{ rotate: likeRotate }}
                className="text-secondary font-display-lg border-2 border-secondary rounded-lg px-2 bg-surface-container-lowest/80 backdrop-blur-sm"
              >
                ДА
              </motion.span>
            </div>
          </motion.div>

          <motion.div 
            style={{ opacity: nopeOpacity }}
            className="absolute inset-0 rounded-3xl pointer-events-none flex items-center justify-center p-md z-40"
          >
            <div className="w-full h-full border-4 border-error rounded-2xl flex items-start justify-start p-sm">
              <motion.span 
                style={{ rotate: nopeRotate }}
                className="text-error font-display-lg border-2 border-error rounded-lg px-2 bg-surface-container-lowest/80 backdrop-blur-sm"
              >
                НЕТ
              </motion.span>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
