/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CardItem } from '../types';
import { useLanyard } from '../hooks/useLanyard';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  bg?: string;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, bg = 'bg-transparent', fullWidth = false }) => (
  <section id={id} className={`${bg} py-24 sm:py-32 overflow-hidden border-t border-white/5`}>
    <div className={`${fullWidth ? 'w-full px-6' : 'max-w-7xl mx-auto px-6'}`}>
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-16 flex items-center gap-6"
      >
        <h2 className="text-5xl sm:text-7xl font-display font-black tracking-tighter uppercase text-white">
          {title}
        </h2>
        <div className="hidden sm:block flex-grow h-[1px] bg-gradient-to-r from-accent/20 via-accent/5 to-transparent" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);

interface BannerCardProps {
  item: CardItem;
}

export const BannerCard: React.FC<BannerCardProps & { onClick: () => void }> = ({ item, onClick }) => {
  const { presence } = useLanyard(item.discordId || '');

  const statusColor = {
    online: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]',
    idle: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]',
    dnd: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
    offline: 'bg-neutral-500 shadow-none',
  }[presence?.discord_status || 'offline'];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative h-[450px] w-full rounded-[40px] overflow-hidden border border-white/5 bg-neutral-950 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-accent/40 transition-all duration-500"
      id={item.id}
    >
      {/* CLICK FLASH EFFECT */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileTap={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-white z-[60] pointer-events-none"
      />
    {/* BANNER IMAGE */}
    <div className="absolute inset-0 overflow-hidden">
      {item.imgSrc ? (
        <motion.img 
          src={item.imgSrc} 
          alt={item.title} 
          className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700"
          whileHover={{ scale: 1.1 }}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full bg-neutral-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    </div>

    {/* CONTENT OVERLAY */}
    <div className="absolute inset-0 p-10 flex flex-col items-center justify-center text-center">
      
      {/* PROFILE CIRCLE */}
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-full border-2 border-accent/20 p-1 flex items-center justify-center overflow-hidden glass shadow-[0_10px_30px_rgba(255,0,0,0.1)] relative">
          {item.profileImg ? (
            <img 
              src={item.profileImg} 
              alt={item.title} 
              className="w-full h-full rounded-full object-cover transition-all duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-neutral-200 flex items-center justify-center text-2xl font-black text-black/20 italic">
              {item.title[0]}
            </div>
          )}
        </div>
        {/* ONLINE INDICATOR */}
        {item.discordId && (
          <div className={`absolute bottom-1 right-2 w-5 h-5 rounded-full border-4 border-black z-20 ${statusColor} ${presence?.discord_status !== 'offline' ? 'animate-pulse' : ''}`} />
        )}
      </div>

      <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter group-hover:tracking-normal transition-all duration-500 mb-6">
        {item.title}
      </h3>

      {/* TYPEWRITER BIO - ALWAYS VISIBLE ON TTE */}
      {item.type === 'threat' && (
        <div className="w-full overflow-hidden">
          <div className="inline-block">
            <p className="text-white font-mono text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 drop-shadow-lg">
              {item.description.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.5 + (index * 0.05),
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </div>
        </div>
      )}
    </div>

    {/* DECORATIVE HOVER EFFECT (removed bottom box per user's "unnecessary text" request, but keeping card clean) */}
  </motion.div>
  );
};
