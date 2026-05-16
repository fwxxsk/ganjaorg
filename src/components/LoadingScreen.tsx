/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col justify-center items-center font-mono"
    >
      <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
        <motion.div 
          className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_15px_rgba(255,0,0,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-[10px] tracking-[0.5em] text-white/40 uppercase">
        Loading System_{Math.round(progress)}%
      </div>

      {/* GLITCH BOXES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.1, 0],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{ 
              duration: 0.2, 
              repeat: Infinity, 
              repeatDelay: Math.random() * 5 
            }}
            className="absolute w-20 h-2bg-white/5 bg-accent/20"
            style={{ 
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
