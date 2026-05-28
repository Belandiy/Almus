import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../hooks/useAppContext';

const WelcomeScreen: React.FC = () => {
  const { startNewOnboarding } = useAppContext();

  const handleStart = () => {
    startNewOnboarding();
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col relative px-md bg-surface-container-low overflow-y-auto no-scrollbar"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary-fixed blur-[100px] opacity-40 rounded-full pointer-events-none z-0"></div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center gap-xl relative z-10 pt-xl">
        {/* AI Mentor Visual Component */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center"
        >
          {/* Inner soft gradient circle behind bot */}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-primary-fixed-dim to-inverse-primary shadow-[0px_4px_24px_rgba(0,112,235,0.15)] flex items-center justify-center border-4 border-surface-container-lowest">
            <span
              className="material-symbols-outlined text-[72px] md:text-[88px] text-primary-container"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              smart_toy
            </span>
          </div>

          {/* Decorative Sparkles */}
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="material-symbols-outlined absolute bottom-4 -left-6 text-[24px] text-primary-container"
          >
            auto_awesome
          </motion.span>
        </motion.div>

        {/* Typography Header */}
        <div className="text-center flex flex-col gap-sm">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Твой ИИ-карьерный ментор
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[280px] mx-auto">
            Давай построим карьеру твоей мечты шаг за шагом.
          </p>
        </div>
      </div>

      {/* Sticky Action Bottom Area */}
      <div className="w-full pb-xl pt-lg relative z-20 mt-auto">
        <button
          onClick={handleStart}
          aria-label="Начать бесплатный онбординг"
          className="w-full bg-primary-container text-on-primary-container font-headline-md text-headline-md py-4 rounded-full btn-duo flex items-center justify-center hover:bg-surface-tint focus:outline-none focus:ring-4 focus:ring-primary-fixed-dim transition-colors"
        >
          Начать
        </button>
      </div>
    </motion.main>
  );
};

export default WelcomeScreen;
