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
      // Duck main music
      if (audioRef.current && !audioRef.current.muted) {
        audioRef.current.volume = 0.1;
      }
      
      const soundToPlay = customSound || "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";
      sfxRef.current.src = soundToPlay;
      sfxRef.current.currentTime = 0;
      sfxRef.current.play().catch(e => console.error("SFX play failed:", e));

      // Restore main music after SFX ends
      setTimeout(() => {
        if (audioRef.current && !audioRef.current.muted) {
          audioRef.current.volume = 1.0;
        }
      }, 1500);
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-accent selection:text-white bg-white relative`}>
      {/* GLOBAL BACKGROUND IMAGE */}
      {APP_CONFIG.customBackgroundImg && (
        <div 
          className="fixed inset-0 z-[-1] pointer-events-none bg-cover bg-center bg-fixed transition-all duration-700"
          style={{ backgroundImage: `url(${APP_CONFIG.customBackgroundImg})` }}
        />
      )}
      
      {/* BLUE & PINK VIBE OVERLAY*/}
    {/* BLUE & PINK VIBE OVERLAY */}
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
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className={entered && !isMusicPausedForModal ? "animate-accent" : ""} />}
              </button>
            </div>

            {/* HERO / HOF SECTION */}
      <section id="hof" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent">
        {/* Background Gradients */}
        <div className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-accent/10 via-pink/5 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_70%)] blur-3xl opacity-30 pointer-events-none" />
        
        {/* FLASHING BG ELEMENTS */}
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

        {/* SCROLL INDICATOR */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-4 group"
        >
          <a href="#kupal" className="flex flex-col items-center gap-2 group">
             <span className="text-[10px] font-bold tracking-[0.5em] text-black/40 uppercase group-hover:text-accent transition-colors">SCROLL</span>
             <ChevronDown className="text-black/20 group-hover:text-pink group-hover:translate-y-1 transition-all animate-bounce" size={32} strokeWidth={1} />
          </a>
        </motion.div>

        {/* Floating Decals */}
        <div className="absolute bottom-10 left-10 hidden xl:block animate-pulse">
          <div className="text-[10px] font-mono text-black/20 uppercase vertical-rl tracking-[1em]">SYSTEM_STABLE</div>
        </div>
      </section>

      {/* KUPAL SECTION */}
      <section id="kupal" className="bg-white/90 backdrop-blur-md py-32 flex items-center justify-center border-t border-black/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => playInteractionSound()}
          className="cursor-pointer group relative"
        >
          <h2 className="text-5xl md:text-8xl font-display font-black text-black text-center uppercase tracking-tighter px-6 leading-none transition-transform group-hover:scale-105 duration-500">
            KUPAL KAMI TOL <br />
            <span className="text-accent">SAMA KA?</span>
          </h2>
          
          {/* Subtle decoration */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:via-pink/50 transition-all" />
        </motion.div>
      </section>

      {/* THREAT TO EVERYONE (TTE) SECTION */}
      <Section id="threat" title="TTE" bg="bg-white/90 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {THREAT_ITEMS.map((item) => (
            <BannerCard 
              key={item.id} 
              item={item} 
              onClick={() => playInteractionSound(item.soundSrc)}
            />
          ))}
        </div>
      </Section>

      {/* EXCLUSIVE SECTION */}
      <Section id="menace" title="EXCLUSIVE" fullWidth>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {MENACE_ITEMS.map((item) => (
            <BannerCard 
              key={item.id} 
              item={item} 
              onClick={() => playInteractionSound(item.soundSrc)}
            />
          ))}
        </div>
      </Section>

      {/* MEMBERS SECTION */}
      <Section id="members" title="MEMBERS" bg="bg-white/90 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MEMBERS_DATA.map((member) => (
            <MemberCard 
              key={member.id} 
              member={member} 
              onClick={() => playInteractionSound(member.soundSrc)}
            />
          ))}
        </div>
      </Section>

      {/* ABOUT US SECTION */}
      <Section id="about" title="ABOUT US" bg="bg-white/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-2xl sm:text-4xl text-black font-medium leading-tight tracking-tight">
              GANJA is more than just a community; it's a digital frontier. Born from the intersection of gaming culture and high-fidelity design, we've created a sanctuary for those who refuse the ordinary.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-20 bg-black/90 backdrop-blur-md border-t border-black/5 text-center text-black/30 font-mono text-xs uppercase tracking-[0.5em] px-6">
        <div className="flex items-center justify-center gap-8 mb-12 opacity-50">
          <a href="#" className="hover:text-accent transition-colors">DISCORD</a>
          <a href="#" className="hover:text-pink transition-colors">X / TWITTER</a>
          <a href="#" className="hover:text-accent transition-colors">OPENSEA</a>
        </div>
        <div>© 2026 GANJA ORG // ALL RIGHTS RESERVED</div>
      </footer>

      {/* HIDDEN AUDIO ELEMENT */}
      <audio ref={audioRef} src={APP_CONFIG.bgMusicUrl} loop />
      <audio ref={sfxRef} src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" />
    </motion.div>
    )}
  </AnimatePresence>
  </div>
  );
}

