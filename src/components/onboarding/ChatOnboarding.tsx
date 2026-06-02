import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../hooks/useAppContext';
import type { ChatMessage } from '../../context/AppContext';
import MessageBubble from '../ui/MessageBubble';
import { generateAiResponse, generateStrategy } from '../../lib/aiService';

const ChatOnboarding: React.FC = () => {
  const { 
    setCurrentScreen, 
    setUserProfile, 
    userProfile, 
    messages, 
    addMessage, 
    setStrategyData 
  } = useAppContext();
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInputValue('');

    // Set name on first message to transition UI state
    if (!userProfile.name) {
      setUserProfile({ name: text });
    }
    
    // 3. Get AI response
    setIsTyping(true);
    try {
      const response = await generateAiResponse([...messages, userMessage], userProfile);
      setIsTyping(false);

      addMessage({
        role: 'ai',
        content: response.content,
        options: response.options,
      });

      // Show strategy button only on AI's final phrase
      if (response.content.toLowerCase().includes("готов составить твой") || 
          response.content.toLowerCase().includes("персональный карьерный план")) {
        setIsReady(true);
      }
    } catch (error) {
      console.error("AI Response error:", error);
      setIsTyping(false);
    }
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const onGenerateStrategy = async () => {
    setIsGenerating(true);
    try {
      const strategy = await generateStrategy(userProfile, messages);
      setStrategyData(strategy);
      
      // Update profile with detected role and experience
      if (strategy.roles && strategy.roles.length > 0) {
        const topRole = strategy.roles[0].title;
        
        // Try to infer experience from history or set default
        const historyText = messages.map(m => m.content).join(' ').toLowerCase();
        let experience = 'IT-специалист';
        if (historyText.includes('студент')) experience = 'Студент';
        else if (historyText.includes('нет опыта')) experience = 'Без опыта';
        else if (historyText.includes('опыт')) experience = 'Junior';
        
        setUserProfile(prev => ({
          ...prev,
          role: topRole,
          experience: experience,
          currentSkills: strategy.skills.filter(s => !s.isGap).map(s => s.name)
        }));
      }
      
      setCurrentScreen('strategy');
    } catch (error) {
      console.error("Failed to generate strategy:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isInitialState = !userProfile.name;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col bg-surface-container-low text-on-surface antialiased relative overflow-hidden"
    >
      {/* Loading Overlay for Strategy Generation */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-surface/90 backdrop-blur-md flex flex-col items-center justify-center p-xl text-center"
          >
            <div className="relative w-24 h-24 mb-lg">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full"
              />
              <span className="material-symbols-outlined text-primary text-[48px] absolute inset-0 flex items-center justify-center animate-pulse">
                auto_awesome
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md mb-sm text-on-surface">Создаю твой план...</h2>
            <p className="text-on-surface-variant max-w-[240px]">
              ИИ анализирует твои навыки и подбирает лучшие вакансии на рынке.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/10 to-transparent pointer-events-none z-0"></div>

      {/* Header - Only visible after name is entered */}
      <AnimatePresence>
        {!isInitialState && (
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 w-full z-50 flex justify-between items-center px-md py-sm bg-surface/80 backdrop-blur-xl shadow-sm border-b border-surface-variant/20"
          >
            <button
              onClick={() => setCurrentScreen('choice')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant/50 transition-all text-on-surface-variant"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-headline-md text-headline-md font-bold text-primary flex-1 text-center">
              Карьерный ассистент
            </h1>
            <div className="w-10" />
          </motion.header>
        )}
      </AnimatePresence>

      {/* Chat Messages - Only visible after name is entered */}
      <main 
        ref={scrollRef}
        className="flex-1 w-full px-md py-lg flex flex-col gap-lg pb-[140px] relative z-10 overflow-y-auto no-scrollbar"
      >
        {!isInitialState && (
          <div className="flex flex-col gap-lg">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} type={msg.role === 'ai' ? 'ai' : 'user'} content={msg.content} />
            ))}
            
            {isTyping && <MessageBubble type="typing" />}

            {/* AI Options */}
            {!isTyping && messages[messages.length - 1]?.role === 'ai' && messages[messages.length - 1]?.options && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-sm justify-end w-full"
              >
                {messages[messages.length - 1].options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSend(option)}
                    className="bg-primary-container/20 border border-primary-container/30 hover:bg-primary-container/30 text-primary font-label-md px-md py-sm rounded-full transition-all active:scale-95"
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </main>

      {/* Input Area */}
      <motion.div 
        layout
        className={cn(
          "absolute left-0 right-0 z-40 transition-all duration-500 flex flex-col px-md",
          isInitialState ? "top-1/2 -translate-y-1/2" : "bottom-sm md:bottom-md"
        )}
      >
        <div className="w-full flex flex-col gap-sm">
          {isInitialState && (
            <motion.label 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              className="font-label-md text-on-surface-variant text-center w-full mb-3"
              htmlFor="ai-input"
            >
              Как к Вам обращаться?
            </motion.label>
          )}

          <div className={cn(
            "relative flex items-center bg-surface-container-lowest rounded-full border border-surface-variant px-6 py-4 w-full transition-all duration-300",
            isInitialState ? "shadow-[0_0_32px_rgba(0,112,235,0.12),0_8px_24px_rgba(0,0,0,0.04)]" : "shadow-lg"
          )}>
            {/* Text Input */}
            <input 
              autoComplete="off" 
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-body-lg text-on-surface placeholder:text-outline-variant p-0 m-0 w-full caret-primary" 
              id="ai-input" 
              placeholder={isInitialState ? "Введите имя..." : "Сообщение..."}
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
              autoFocus
            />
            
            {/* Right Actions */}
            <div className="flex items-center ml-4">
              <button 
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim()}
                className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md shadow-primary/20 disabled:opacity-50 disabled:bg-surface-variant flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[24px]">{isInitialState ? 'arrow_upward' : 'send'}</span>
              </button>
            </div>
          </div>
        </div>

        {isReady && !isInitialState && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onGenerateStrategy}
            className="w-full bg-secondary text-on-secondary font-label-md py-4 rounded-full shadow-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 group mt-4"
          >
            Составить план
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">auto_awesome</span>
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default ChatOnboarding;
