import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../hooks/useAppContext';

const ChoiceScreen: React.FC = () => {
  const { setCurrentScreen } = useAppContext();
  const [showStubModal, setShowStubModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full h-full flex flex-col bg-surface-container-low text-on-surface antialiased relative overflow-hidden px-md pt-lg"
    >
      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 to-transparent pointer-events-none z-0"></div>

      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center py-sm bg-surface/80 backdrop-blur-xl shadow-sm -mx-md px-md">
        <button
          onClick={() => setCurrentScreen('welcome')}
          aria-label="Go back"
          className="p-2 -ml-2 rounded-full hover:bg-surface-variant/50 transition-all duration-200 active:scale-95 text-on-surface"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
            arrow_back
          </span>
        </button>
      </header>

      <main className="flex-1 flex flex-col z-10 mt-md overflow-y-auto no-scrollbar pb-xl">
        {/* Header Section */}
        <section className="mb-xl text-center space-y-sm">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Как нам лучше познакомиться?
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Выберите удобный способ, чтобы ИИ составил вашу персональную стратегию.
          </p>
        </section>

        {/* Options Section */}
        <section className="flex flex-col gap-md">
          {/* Option 1: Upload Resume */}
          <button
            onClick={() => setShowStubModal(true)}
            aria-label="Загрузить резюме для анализа ИИ"
            className="group relative w-full text-left bg-surface-container-lowest rounded-3xl p-md shadow-[0px_4px_12px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08),0px_2px_4px_rgba(0,0,0,0.04)] transition-all duration-300 active:scale-[0.98] border border-transparent hover:border-primary/20 focus:outline-none focus:border-primary overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-sm">
              <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary mb-2 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                  upload_file
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Загрузить резюме</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                ИИ проанализирует ваш опыт автоматически за пару секунд.
              </p>
            </div>
          </button>

          {/* Option 2: Chat with AI */}
          <button
            onClick={() => setCurrentScreen('chat')}
            aria-label="Пообщаться с ИИ для настройки профиля"
            className="group relative w-full text-left bg-surface-container-lowest rounded-3xl p-md shadow-[0px_4px_12px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08),0px_2px_4px_rgba(0,0,0,0.04)] transition-all duration-300 active:scale-[0.98] border border-transparent hover:border-primary/20 focus:outline-none focus:border-primary overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-container/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-sm">
              <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                  forum
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Пообщаться с ИИ</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Ответьте на несколько вопросов в формате чата.
              </p>
            </div>
          </button>
        </section>
      </main>

      <AnimatePresence>
        {showStubModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-md bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface-container rounded-[32px] p-xl max-w-[340px] w-full text-center shadow-2xl flex flex-col items-center gap-md border border-surface-variant/30"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-4xl">info</span>
              </div>
              <div className="space-y-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Функционал в разработке</h3>
                <p className="font-body-md text-body-md text-on-surface-variant px-2">
                  Загрузка резюме будет доступна в ближайшее время. Пока вы можете пообщаться с нашим ИИ-ассистентом.
                </p>
              </div>
              <button
                onClick={() => setShowStubModal(false)}
                className="w-full bg-primary text-on-primary py-4 rounded-full font-label-lg hover:bg-primary/90 transition-all active:scale-95 mt-2"
              >
                Понятно
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChoiceScreen;
