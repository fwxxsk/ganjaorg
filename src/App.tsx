/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Section, BannerCard } from './components/Common';
import { MemberCard } from './components/MemberCard';
import { SplashScreen } from './components/SplashScreen';
import { MEMBERS_DATA, THREAT_ITEMS, MENACE_ITEMS, APP_CONFIG } from './constants';
import { Globe, Shield, Terminal, Zap, Volume2, VolumeX, ChevronDown } from 'lucide-react';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPausedForModal, setIsMusicPausedForModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sfxRef = useRef<HTMLAudioElement>(null);

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const playInteractionSound = (customSound?: string) => {
    if (sfxRef.current) {
      if (audioRef.current && !audioRef.current.muted) {
        audioRef.current.volume = 0.1;
      }

      const soundToPlay =
        customSound ||
        "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";

      sfxRef.current.src = soundToPlay;
      sfxRef.current.currentTime = 0;
      sfxRef.current.play().catch(e => console.error("SFX play failed:", e));

      setTimeout(() => {
        if (audioRef.current && !audioRef.current.muted) {
          audioRef.current.volume = 1.0;
        }
      }, 1500);
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-accent selection:text-white bg-white relative`}>

      {/* GLOBAL BACKGROUND IMAGE (FIXED) */}
      {APP_CONFIG.customBackgroundImg && (
        <div
          className="fixed inset-0 z-[-1] pointer-events-none bg-cover bg-center bg-fixed transition-all duration-700"
          style={{
            backgroundImage: `url('${APP_CONFIG.customBackgroundImg}')`,
          }}
        />
      )}

      {/* BLUE & PINK VIBE OVERLAY (RESTORED) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-br from-accent/5 via-pink/5 to-accent/10 mix-blend-multiply" />

      <AnimatePresence mode="wait" initial={false}>
        {!entered ? (
          <SplashScreen key="splash" onEnter={handleEnter} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navigation />

            {/* AUDIO CONTROL (Floating) */}
            <div className="fixed bottom-8 right-8 z-[60]">
              <button
                onClick={toggleMute}
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-black border-black/10 hover:border-accent hover:shadow-[0_0_15px_rgba(255,0,204,0.3)] transition-all"
              >
                {isMuted ? (
                  <VolumeX size={20} />
                ) : (
                  <Volume2 size={20} className={entered && !isMusicPausedForModal ? "animate-accent" : ""} />
                )}
              </button>
            </div>

            {/* HERO / HOF SECTION */}
            <section id="hof" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent">

              <div className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-accent/10 via-pink/5 to-transparent opacity-50 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_70%)] blur-3xl opacity-30 pointer-events-none" />

              <motion.div
                animate={{ opacity: [0, 0.05, 0] }}
                transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
                className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none"
              />

              <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="mb-8"
                >
                  <h1 className="text-7xl sm:text-9xl md:text-[12rem] font-display font-black leading-[0.8] tracking-tighter uppercase text-black drop-shadow-2xl">
                    GAN<span className="text-accent">JA</span>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="max-w-2xl mx-auto text-lg sm:text-2xl text-neutral-600 font-medium leading-relaxed tracking-tight mb-12"
                >
                  ALL EYES ON US
                </motion.p>

              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 flex flex-col items-center gap-4 group"
              >
                <a href="#kupal" className="flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold tracking-[0.5em] text-black/40 uppercase group-hover:text-accent transition-colors">
                    SCROLL
                  </span>
                  <ChevronDown className="text-black/20 group-hover:text-pink group-hover:translate-y-1 transition-all animate-bounce" size={32} strokeWidth={1} />
                </a>
              </motion.div>

            </section>

            {/* REST OF YOUR FILE UNCHANGED */}
