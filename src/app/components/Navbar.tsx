// File: src/components/Navbar.tsx
// Function: Sticky navigation bar with Cinematic Video Modal & Premium Mobile Menu.
// Logic & Tech:
// 1. Desktop: Clean inline links.
// 2. Mobile: Hamburger menu (Menu/X icons) that opens a glassmorphism dropdown.
// 3. Modals & Menus lock body scroll to prevent background scrolling.
// 4. Framer Motion handles all smooth transitions.

'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // <-- Added Mobile Icons
import CareFlyLogo from './careflylogo';
import Link from 'next/link';


export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // States
  const [activeVideo, setActiveVideo] = useState<'patient' | 'doctor' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- State for Mobile Menu

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Lock body scroll when either video or mobile menu is open
  useEffect(() => {
    if (activeVideo || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeVideo, isMobileMenuOpen]);

  // Handle Navigation Clicks (Works for both Desktop and Mobile)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    if (item === 'For Patients') {
      e.preventDefault();
      setActiveVideo('patient');
    } else if (item === 'For Doctors') {
      e.preventDefault();
      setActiveVideo('doctor');
    }
    // Always close mobile menu after clicking a link
    setIsMobileMenuOpen(false); 
  };

  const navItems = ['Platform', 'For Patients', 'For Doctors'];

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-40 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled ? 'pt-4 sm:pt-6 px-2 sm:px-4' : 'pt-0 px-0'
        }`}
      >
        <motion.nav
          initial={{ width: '100%', borderRadius: '0px' }}
          animate={{
            width: isScrolled ? 'min(750px, 95vw)' : '100%',
            borderRadius: isScrolled ? '100px' : '0px',
            backgroundColor: isScrolled ? 'rgba(1, 12, 12, 0.6)' : 'rgba(1, 12, 12, 0.1)',
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 backdrop-blur-2xl border-b border-white/5 ${
            isScrolled ? 'border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]' : ''
          }`}
        >
          {/* Glass Noise Texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          />

          {/* Logo Section */}
          <Link href="/" className="relative z-10 flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0">
            <CareFlyLogo className="w-8 h-8 sm:w-12 sm:h-12" />
            <span className="text-white font-black text-xl sm:text-2xl tracking-wide bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
              CareFly
            </span>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 relative z-10">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={item === 'Platform' ? '#platform' : '#'} 
                onClick={(e) => handleNavClick(e, item)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Actions: Get App & Mobile Menu Toggle */}
          <div className="relative z-10 flex items-center gap-3 shrink-0">
            <button className="px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95">
              Get Apps
            </button>

            {/* Hamburger Button (Visible only on Mobile) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu Dropdown (Visible only when isMobileMenuOpen is true) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-24 px-4 bg-[#010c0c]/95 backdrop-blur-3xl md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 mt-10">
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={item === 'Platform' ? '#platform' : '#'} 
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-2xl font-bold text-slate-300 hover:text-white border-b border-white/10 pb-4 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Video Modal Portal (Kept exactly as it was) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-[#010c0c]/80 backdrop-blur-xl cursor-pointer"
              onClick={() => setActiveVideo(null)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl aspect-video bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(16,185,129,0.2)] z-10"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>

              <video 
                autoPlay 
                controls 
                controlsList="nodownload"
                className="w-full h-full object-cover"
                src={activeVideo === 'patient' ? '/videos/patient-video.mp4' : '/videos/doctor-video.mp4'}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}