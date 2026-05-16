/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOF', href: '#hof' },
    { name: 'THREAT TO EVERYONE', href: '#threat' },
    { name: 'EXCLUSIVE', href: '#menace' },
    { name: 'MEMBERS', href: '#members' },
    { name: 'ABOUT', href: '#about' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass border-b' : 'py-8'
      }`}
      id="main-nav"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
        {/* LOGO */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-xl font-black transform -skew-x-12 group-hover:skew-x-0 transition-transform shadow-[0_4px_15px_rgba(255,0,0,0.4)]">
            <span className="text-white">GJ</span>
          </div>
          <span className="font-display font-black text-2xl tracking-tighter uppercase">
            GANJA
          </span>
        </a>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="text-[13px] font-bold tracking-[0.15em] uppercase hover:text-accent transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Cta button / Mobile Trigger */}
        <div className="flex items-center gap-6">
          <a 
            href="https://discord.gg/qnEXAvMEb" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:block px-6 py-2 border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all shadow-sm"
          >
            JOIN US!
          </a>
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-white/5 overflow-hidden"
          >
            <ul className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-xl font-display font-black uppercase tracking-widest hover:text-accent"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
