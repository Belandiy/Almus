import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  content?: React.ReactNode;
  type: 'ai' | 'user' | 'typing';
  delay?: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, type, delay = 0 }) => {
  if (type === 'typing') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col items-start w-full max-w-[85%] md:max-w-xl"
      >
        <div className="flex items-end gap-sm opacity-80">
          {/* Ghost Avatar */}
          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">robot_2</span>
          </div>
          {/* Typing Bubbles */}
          <div className="bg-surface-container-highest px-md py-sm h-12 rounded-[24px] rounded-bl-sm flex gap-2 items-center shadow-[0px_4px_12px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.02)]">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-on-surface-variant rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'ai') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col items-start w-full max-w-[85%] md:max-w-xl"
      >
        <div className="flex items-end gap-sm">
          {/* AI Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-container to-primary flex items-center justify-center shrink-0 shadow-[0px_4px_12px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.02)]">
            <span 
              className="material-symbols-outlined text-on-primary-container text-[20px]" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              robot_2
            </span>
          </div>
          {/* Chat Card */}
          <div className="bg-surface-container-lowest p-md rounded-[24px] rounded-bl-sm shadow-[0px_4px_12px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.02)] relative overflow-hidden group">
            {/* Subtle glass gleam */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="font-body-lg text-body-lg text-on-surface leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex justify-end w-full"
    >
      <div className="bg-primary-container text-on-primary-container p-md rounded-[24px] rounded-br-sm shadow-[0px_4px_12px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.02)] max-w-[85%]">
        <p className="font-body-lg text-body-lg leading-relaxed">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
