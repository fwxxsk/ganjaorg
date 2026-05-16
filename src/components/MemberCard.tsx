/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanyard } from '../hooks/useLanyard';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  onClick: () => void;
  className?: string;
  isNameVisible?: boolean;
}

export const MemberCard: React.FC<MemberCardProps> = ({ 
  member, 
  onClick, 
  className = '',
  isNameVisible = false 
}) => {
  const { presence } = useLanyard(member.discordId);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full h-[300px] rounded-[30px] overflow-hidden group border border-white/5 bg-neutral-950 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 ${className}`}
      id={`member-${member.id}`}
    >
      {/* CLICK FLASH EFFECT */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileTap={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-white z-[60] pointer-events-none"
      />
      {/* BACKGROUND BANNER */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {member.bannerImg ? (
          <motion.img 
            src={member.bannerImg} 
            alt={`${member.name} Banner`} 
            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* CONTENT OVERLAY */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
        
        {/* AVATAR CONTAINER */}
        <div className="relative transform transition-all duration-500 group-hover:scale-110">
          <div className="w-32 h-32 rounded-full border-2 border-white/20 p-1 flex items-center justify-center overflow-hidden bg-neutral-950 shadow-2xl relative">
            {member.profileImg ? (
              <img 
                src={member.profileImg} 
                alt={member.name} 
                className="w-full h-full rounded-full object-cover transition-all"
                referrerPolicy="no-referrer"
              />
            ) : presence?.discord_user?.avatar ? (
              <img 
                src={`https://cdn.discordapp.com/avatars/${member.discordId}/${presence.discord_user.avatar}.png?size=256`} 
                alt={member.name}
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center text-xl font-bold text-white/20 italic">
                {member.name[0]}
              </div>
            )}
          </div>
        </div>

        {/* NAME */}
        <AnimatePresence>
          {isNameVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-8 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10 z-20"
            >
              <h3 className="text-xl font-anton font-normal tracking-wide text-white uppercase">
                {member.name}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
