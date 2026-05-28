import React from 'react';

interface TopAppBarProps {
  title: string;
  showProgress?: boolean;
  progressText?: string;
  showBack?: boolean;
}

const TopAppBar: React.FC<TopAppBarProps> = ({ 
  title, 
  showProgress = false, 
  progressText = "3/5",
  showBack = true 
}) => {
  return (
    <header className="sticky top-0 w-full z-50 flex justify-between items-center px-md py-sm bg-surface/80 backdrop-blur-xl shadow-sm">
      <div className={`flex items-center justify-center p-2 rounded-full hover:opacity-80 active:scale-95 text-on-surface-variant cursor-pointer ${!showBack ? 'invisible' : ''}`}>
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
      <h1 className="font-headline-md text-headline-md font-bold text-primary truncate flex-1 text-center px-sm">
        {title}
      </h1>
      <div className="flex items-center justify-center p-2">
        {showProgress && (
          <span className="font-label-md text-label-md text-outline font-semibold tracking-widest bg-surface-variant/40 px-3 py-1 rounded-full">
            {progressText}
          </span>
        )}
      </div>
    </header>
  );
};

export default TopAppBar;
