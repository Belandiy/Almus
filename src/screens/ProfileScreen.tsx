import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../hooks/useAppContext';

const ProfileScreen: React.FC = () => {
  const { logout, userProfile } = useAppContext();
  const [showStubModal, setShowStubModal] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col px-md py-lg md:py-xl gap-lg">
      {/* Profile Header Card */}
      <section className="bg-surface-container-lowest rounded-xl p-md shadow-ambient flex flex-col items-center text-center gap-md border border-surface-variant/50 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-container/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative w-24 h-24 rounded-full bg-primary-container/10 border-4 border-surface shadow-sm overflow-hidden flex items-center justify-center">
          <span className="material-symbols-outlined text-[48px] text-primary">person</span>
        </div>
        
        <div className="z-10">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-1">{userProfile.name || 'Аноним'}</h2>
          <p className="font-body-md text-body-md text-outline">{userProfile.experience || 'IT-специалист'}</p>
          <div className="mt-sm inline-flex items-center gap-xs px-sm py-xs bg-primary-container/20 rounded-full text-primary">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span className="font-label-sm text-label-sm">Профиль заполнен</span>
          </div>
        </div>
      </section>

      {/* Settings List (iOS Style) */}
      <section className="flex flex-col gap-sm">
        <h3 className="font-label-md text-label-md text-outline uppercase tracking-wider pl-xs">Настройки</h3>
        <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden flex flex-col">
          {/* List Item 1 */}
          <button 
            aria-label="Сменить язык"
            className="flex items-center justify-between p-md w-full text-left hover:bg-surface-variant/20 transition-colors duration-200 active:bg-surface-variant/40 group"
          >
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">language</span>
              </div>
              <span className="font-body-md text-body-md text-on-surface">Язык (RU)</span>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </button>
          <div className="h-px bg-surface-variant ml-md"></div>
          
          {/* List Item 2 */}
          <button 
            aria-label="Мои стратегии"
            className="flex items-center justify-between p-md w-full text-left hover:bg-surface-variant/20 transition-colors duration-200 active:bg-surface-variant/40 group"
          >
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">tactic</span>
              </div>
              <span className="font-body-md text-body-md text-on-surface">Мои стратегии</span>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </button>
          <div className="h-px bg-surface-variant ml-md"></div>
          
          {/* List Item 3 */}
          <button 
            onClick={() => setShowStubModal(true)}
            aria-label="Загрузить новое резюме"
            className="flex items-center justify-between p-md w-full text-left hover:bg-surface-variant/20 transition-colors duration-200 active:bg-surface-variant/40 group"
          >
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">upload_file</span>
              </div>
              <span className="font-body-md text-body-md text-on-surface">Загрузить новое резюме</span>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-sm mt-md">
        <h3 className="font-label-md text-label-md text-outline uppercase tracking-wider pl-xs">Аккаунт</h3>
        <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden flex flex-col">
          <button 
            onClick={handleLogout}
            aria-label="Выйти из аккаунта"
            className="flex items-center justify-between p-md w-full text-left hover:bg-error-container/20 transition-colors duration-200 active:bg-error-container/40 group"
          >
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-full bg-error-container/50 flex items-center justify-center text-error">
                <span className="material-symbols-outlined">logout</span>
              </div>
              <span className="font-body-md text-body-md text-error font-medium">Выйти</span>
            </div>
          </button>
        </div>
      </section>

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
    </div>
  );
};

export default ProfileScreen;
