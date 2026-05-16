/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { APP_CONFIG } from '../constants';

interface SplashScreenProps {
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col justify-center items-center overflow-hidden cursor-pointer"
      id="splash-screen"
      onClick={onEnter}
    >
      {/* BACKGROUND DECAL / GRID */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000012_1px,transparent_1px),linear-gradient(to_bottom,#ff000012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-accent/5 to-black" />
      </div>

      {/* CENTER LOGO / IMAGE */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center max-w-md w-full px-8"
      >
        {APP_CONFIG.splashImgSrc ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: [0.9, 1.02, 1], 
              opacity: 1,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full relative group"
          >
            <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <img 
              src={APP_CONFIG.splashImgSrc} 
              alt="System Logo" 
              className="w-full h-auto object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(255,0,0,0.1)] group-hover:drop-shadow-[0_15px_40px_rgba(255,0,0,0.2)] transition-all duration-500 animate-pulse"
              referrerPolicy="no-referrer"
            />
            <div className="mt-8 text-center">
              <span className="text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase group-hover:text-accent transition-colors duration-500">
                INITIATE_SYSTEM_LINK
              </span>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="w-24 h-24 bg-accent rounded-2xl flex items-center justify-center text-4xl font-black transform -skew-x-12 mb-8 shadow-[0_10px_30px_rgba(0,51,255,0.2)]">
              <span className="text-white">GJ</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-black mb-4">
              SYSTEM INITIATED
            </h1>
            
            <p className="text-neutral-400 font-mono text-xs tracking-[0.4em] uppercase mb-12">
              Decrypting Arcsendo Core...
            </p>

            <button 
              className="group relative px-12 py-5 overflow-hidden rounded-full border border-black/10 transition-all hover:border-pink"
            >
              <div className="absolute inset-0 bg-pink translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 font-display font-black text-sm tracking-[0.5em] uppercase text-black group-hover:text-white">
                CLICK TO ENTER
              </span>
            </button>
          </>
        )}
      </motion.div>

      {/* TERMINAL TEXT DECORATIONS */}
      <div className="absolute bottom-12 left-12 font-mono text-[10px] text-white/10 uppercase space-y-2 hidden md:block">
        <div>[ STATUS: SYNDICATE_READY ]</div>
        <div>[ AUTH: ADMIN_LEVEL_4 ]</div>
        <div>[ NETWORK: ENCRYPTED_MESH ]</div>
      </div>

      <div className="absolute bottom-12 right-12 font-mono text-[10px] text-white/10 uppercase hidden md:block">
        V.0.4.2 // GANJA_OS
      </div>

      {/* SCANLINE EFFECT */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="w-full h-[1px] bg-accent animate-[scanline_4s_linear_infinite]" />
      </div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </motion.div>
  );
};
