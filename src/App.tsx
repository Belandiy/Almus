import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppProvider';
import { useAppContext } from './hooks/useAppContext';
import WelcomeScreen from './components/onboarding/WelcomeScreen';
import ChoiceScreen from './components/onboarding/ChoiceScreen';
import ChatOnboarding from './components/onboarding/ChatOnboarding';
import StrategyScreen from './screens/StrategyScreen';
import JobsScreen from './screens/JobsScreen';
import ProfileScreen from './screens/ProfileScreen';
import TopAppBar from './components/layout/TopAppBar';
import BottomNavBar from './components/layout/BottomNavBar';

const AppLayout = ({ children, title, showBack = true }: { children: React.ReactNode, title: string, showBack?: boolean }) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <TopAppBar title={title} showBack={showBack} />
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[100px]">
        {children}
      </div>
      <BottomNavBar />
    </div>
  );
};

const MainContent = () => {
  const { currentScreen } = useAppContext();

  return (
    <div className="w-full max-w-[480px] h-[100dvh] bg-surface shadow-2xl relative overflow-hidden flex flex-col border-x border-surface-variant/30">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && <WelcomeScreen key="welcome" />}
        {currentScreen === 'choice' && <ChoiceScreen key="choice" />}
        {currentScreen === 'chat' && <ChatOnboarding key="chat" />}
        
        {currentScreen === 'strategy' && (
          <AppLayout key="strategy" title="Стратегия" showBack={false}>
            <StrategyScreen />
          </AppLayout>
        )}
        
        {currentScreen === 'jobs' && (
          <AppLayout key="jobs" title="Вакансии" showBack={false}>
            <JobsScreen />
          </AppLayout>
        )}
        
        {currentScreen === 'profile' && (
          <AppLayout key="profile" title="Профиль" showBack={false}>
            <ProfileScreen />
          </AppLayout>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="w-full min-h-screen bg-surface-container-low flex justify-center items-center">
        <MainContent />
      </div>
    </AppProvider>
  );
}

export default App;
