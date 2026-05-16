/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Section } from './components/Common';
import { MemberCard } from './components/MemberCard';
import { SplashScreen } from './components/SplashScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { MEMBERS_DATA, APP_CONFIG } from './constants';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [entered, setEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
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

  const handleMemberClick = (memberId: string, soundSrc?: string) => {
    setSelectedMemberId(selectedMemberId === memberId ? null : memberId);
    playInteractionSound(soundSrc);
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
    <div className={`min-h-screen font-sans selection:bg-accent selection:text-white relative`}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* GLOBAL BACKGROUND IMAGE */}
      {APP_CONFIG.customBackgroundImg && (
        <div 
          className="fixed inset-0 z-[-1] pointer-events-none opacity-100 bg-cover bg-center bg-fixed transition-all duration-700"
          style={{ backgroundImage: `url(${APP_CONFIG.customBackgroundImg})` }}
        >
          {/* Subtle dark overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      
      {/* GLOBAL VIGNETTE / ACCENT GRADIENT */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-r from-accent/10 via-transparent to-accent/10 opacity-30" />
      
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

      <section id="hof" className="relative min-h-screen flex items-center justify-center pt-32 pb-40 overflow-hidden bg-transparent">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-black via-transparent to-transparent opacity-80 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {MEMBERS_DATA.slice(0, 3).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: index * 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-[450px]"
              >
                <MemberCard 
                  member={member} 
                  onClick={() => playInteractionSound(member.soundSrc)}
                  className="h-full" 
                  isNameVisible={true}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group z-20"
        >
          <a href="#kupal" className="flex flex-col items-center gap-2 group">
             <span className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase group-hover:text-accent transition-colors">SCROLL</span>
             <ChevronDown className="text-white/20 group-hover:text-accent group-hover:translate-y-1 transition-all animate-bounce" size={32} strokeWidth={1} />
          </a>
        </motion.div>

        {/* Floating Decals */}
        <div className="absolute bottom-10 left-10 hidden xl:block animate-pulse">
          <div className="text-[10px] font-mono text-white/20 uppercase vertical-rl tracking-[1em]">SYSTEM_STABLE</div>
        </div>
      </section>

      {/* KUPAL SECTION */}
      <section id="kupal" className="bg-transparent py-32 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => playInteractionSound()}
          className="cursor-pointer group relative"
        >
          <h2 className="text-5xl md:text-8xl font-display font-black text-white text-center uppercase tracking-tighter px-6 leading-none transition-transform group-hover:scale-105 duration-500">
            KUPAL KAMI TOL <br />
            <span className="text-accent">SAMA KA?</span>
          </h2>
          
          {/* Subtle decoration */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:via-accent transition-all" />
        </motion.div>
      </section>

      {/* MEMBERS SECTION */}
      <section id="members" className="relative bg-transparent py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 flex items-center gap-6"
          >
            <h2 className="text-5xl sm:text-7xl font-display font-black tracking-tighter uppercase text-white">
              MEMBERS
            </h2>
            <div className="flex-grow h-[1px] bg-white/10" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-12">
            {MEMBERS_DATA.map((member) => (
              <MemberCard 
                key={member.id} 
                member={member} 
                onClick={() => handleMemberClick(member.id, member.soundSrc)}
                isNameVisible={selectedMemberId === member.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <Section id="about" title="ABOUT US" bg="bg-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-2xl sm:text-4xl text-white font-medium leading-tight tracking-tight">
              GANJA.ORG is more than just a community; it's a digital frontier. Born from the intersection of gaming culture and high-fidelity design, we've created a sanctuary for those who refuse the ordinary.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-20 bg-transparent text-center text-white/30 font-mono text-xs uppercase tracking-[0.5em] px-6">
        <div className="flex items-center justify-center gap-8 mb-12 opacity-50">
          <a href="#" className="hover:text-accent transition-colors">DISCORD</a>
          <a href="#" className="hover:text-accent transition-colors">X / TWITTER</a>
          <a href="#" className="hover:text-accent transition-colors">OPENSEA</a>
        </div>
        <div className="mb-2">© 2026 GANJA.ORG COLLECTIVE // ALL RIGHTS RESERVED</div>
        <div className="opacity-20 text-[8px] tracking-[1em] mt-4">SkyeLuvsU</div>
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

