import { createContext } from 'react';

export type Screen = 'welcome' | 'choice' | 'chat' | 'strategy' | 'jobs' | 'profile';

export interface ChatMessage {
  id: string;
  role: 'ai' | 'user' | 'system';
  content: string;
  options?: string[];
  timestamp: number;
}

export interface SkillInfo {
  name: string;
  level: number; // 0-100
  isGap: boolean;
}

export interface RoadmapStep {
  title: string;
  description: string;
  timeframe: string;
  isCompleted?: boolean;
}

export interface RoleMatch {
  title: string;
  match: number;
  description: string;
  skills: string[];
}

export interface StrategyData {
  readiness: number;
  skills: SkillInfo[];
  roles: RoleMatch[];
  roadmap: RoadmapStep[];
  salaryProjection: {
    current: number;
    sixMonths: number;
    oneYear: number;
  };
}

export interface UserProfile {
  name?: string;
  role?: string;
  experience?: string;
  goals?: string[];
  currentSkills?: string[];
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface AppState {
  currentScreen: Screen;
  userProfile: UserProfile;
  onboardingStep: number;
  likedJobs: string[];
  rejectedJobs: string[];
  messages: ChatMessage[];
  strategyData: StrategyData | null;
}

export interface AppContextType extends AppState {
  setCurrentScreen: (screen: Screen) => void;
  setUserProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  setOnboardingStep: (step: number) => void;
  toggleLikedJob: (jobId: string) => void;
  toggleRejectedJob: (jobId: string) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setStrategyData: (data: StrategyData) => void;
  logout: () => void;
  startNewOnboarding: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const initialState: AppState = {
  currentScreen: 'welcome',
  userProfile: {},
  onboardingStep: 1,
  likedJobs: [],
  rejectedJobs: [],
  messages: [],
  strategyData: null,
};
