/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanyard } from '../hooks/useLanyard';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  onClick: () => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, onClick }) => {
  const { presence } = useLanyard(member.discordId);

  const statusColor = {
    online: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]',
    idle: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]',
    dnd: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
    offline: 'bg-neutral-500 shadow-none',
  }[presence?.discord_status || 'offline'];

  const activity = presence?.activities?.[0];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.05 }}
      onClick={onClick}
      className="relative w-full h-[400px] rounded-[40px] overflow-hidden group border border-black/5 bg-neutral-950 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-accent/40 transition-all duration-500"
      id={`member-${member.id}`}
    >
      {/* BACKGROUND BANNER */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {member.bannerImg ? (
          <motion.img 
            src={member.bannerImg} 
            alt={`${member.name} Banner`} 
            className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
            whileHover={{ scale: 1.1 }}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900 opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-all duration-500" />
      </div>

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 z-[1] opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* CONTENT OVERLAY */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-black via-transparent to-transparent">
        
        {/* AVATAR CONTAINER */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full border-2 border-accent/20 p-1 flex items-center justify-center overflow-hidden glass shadow-[0_10px_30px_rgba(0,51,255,0.2)] relative">
            {presence?.discord_user?.avatar && !member.profileImg ? (
              <img 
                src={`https://cdn.discordapp.com/avatars/${member.discordId}/${presence.discord_user.avatar}.png?size=256`} 
                alt={member.name}
                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            ) : member.profileImg ? (
              <img 
                src={member.profileImg} 
                alt={member.name} 
                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-neutral-200 flex items-center justify-center text-3xl font-bold text-black/20 italic">
                {member.name[0]}
              </div>
            )}
          </div>
          {/* ONLINE INDICATOR */}
          <div className={`absolute bottom-2 right-3 w-6 h-6 rounded-full border-4 border-white ${statusColor} shadow-lg z-20 ${presence?.discord_status !== 'offline' ? 'animate-pulse' : ''}`} />
        </div>

        {/* NAME */}
        <h3 className="text-4xl font-display font-black tracking-tighter text-white uppercase group-hover:tracking-normal transition-all duration-500">
          {member.name}
        </h3>
      </div>
    </motion.div>
  );
};
