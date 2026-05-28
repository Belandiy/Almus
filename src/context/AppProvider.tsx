import React, { type ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { AppContext, initialState } from './AppContext';
import type { AppContextType, AppState, Screen, UserProfile, ChatMessage, StrategyData } from './AppContext';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useLocalStorage<AppState>('ai_career_strategist_state', initialState);

  const setCurrentScreen = (screen: Screen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }));
  };

  const setUserProfile = (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    setState((prev) => {
      const newUserProfile = typeof profile === 'function' ? profile(prev.userProfile) : profile;
      return {
        ...prev,
        userProfile: { ...prev.userProfile, ...newUserProfile },
      };
    });
  };

  const setOnboardingStep = (step: number) => {
    setState((prev) => ({ ...prev, onboardingStep: step }));
  };

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          ...message,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
        },
      ],
    }));
  };

  const setStrategyData = (data: StrategyData) => {
    setState((prev) => ({ ...prev, strategyData: data }));
  };

  const toggleLikedJob = (jobId: string) => {
    setState((prev) => {
      const isLiked = prev.likedJobs.includes(jobId);
      return {
        ...prev,
        likedJobs: isLiked
          ? prev.likedJobs.filter((id) => id !== jobId)
          : [...prev.likedJobs, jobId],
        rejectedJobs: prev.rejectedJobs.filter((id) => id !== jobId),
      };
    });
  };

  const toggleRejectedJob = (jobId: string) => {
    setState((prev) => {
      const isRejected = prev.rejectedJobs.includes(jobId);
      return {
        ...prev,
        rejectedJobs: isRejected
          ? prev.rejectedJobs.filter((id) => id !== jobId)
          : [...prev.rejectedJobs, jobId],
        likedJobs: prev.likedJobs.filter((id) => id !== jobId),
      };
    });
  };

  const logout = () => {
    setState({ ...initialState });
  };

  const startNewOnboarding = () => {
    setState({
      ...initialState,
      currentScreen: 'choice'
    });
  };

  const value: AppContextType = {
    ...state,
    setCurrentScreen,
    setUserProfile,
    setOnboardingStep,
    toggleLikedJob,
    toggleRejectedJob,
    addMessage,
    setStrategyData,
    logout,
    startNewOnboarding,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
