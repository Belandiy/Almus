import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';

const BottomNavBar: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useAppContext();

  const tabs = [
    { id: 'strategy', label: 'Стратегия', icon: 'tactic' },
    { id: 'projects', label: 'Практика', icon: 'assignment' },
    { id: 'jobs', label: 'Вакансии', icon: 'work' },
    { id: 'profile', label: 'Профиль', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-md pb-base pt-xs bg-surface/80 backdrop-blur-xl shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] rounded-t-xl">
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.id as any)}
            className={`flex flex-col items-center justify-center transition-all duration-300 active:scale-90 p-2 min-w-[64px] ${
              isActive 
                ? 'text-primary bg-primary-container/20 rounded-full px-md py-xs' 
                : 'text-on-surface-variant hover:bg-surface-variant/50 rounded-lg'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>
              {tab.icon}
            </span>
            <span className={`font-label-sm mt-1 ${isActive ? 'text-label-md' : 'text-[10px]'} truncate w-full text-center`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
