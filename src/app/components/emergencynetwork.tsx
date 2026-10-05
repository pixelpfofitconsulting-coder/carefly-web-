'use client';

import React from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// File Name: EmergencyNetwork.tsx
// Architecture: 3-Column Glassmorphism Grid with Scroll-Triggered Micro-Animations
// Logic & Tech:
// 1. CSS Grid layout for responsiveness (1 column on mobile, 3 columns on large screens).
// 2. Framer Motion 'whileInView' enables smooth slide-up entry animations when scrolling.
// 3. CRITICAL MOBILE FIX: Removed 'overflow-clip' from the parent <section> so mobile 
//    Intersection Observers (scroll sensors) can accurately detect when cards enter the viewport.
// 4. Each card contains continuous native CSS/SVG animations (Radar sweep, pulsing nodes) 
//    that are heavily optimized to not drain mobile battery.
// 5. 'viewport={{ once: true, margin: "-50px" }}' ensures animations fire only once and 
//    trigger slightly before entering the screen for a smoother mobile experience.
// ============================================================================

export default function EmergencyNetwork() {
  return (
    // 🚀 Removed overflow-clip so mobile scroll sensors can detect the cards perfectly
    <section id="emergency-network" className="relative w-full py-24 bg-[#010c0c]">
      
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/5 rounded-t-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> PHYSICAL CARE NETWORK
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white tracking-tight"
            >
              Beyond the Cloud.<br />
              <span className="text-slate-500">Into the Real World.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm max-w-md md:text-right font-light"
          >
            Digital appointments are just the beginning. CareFly physically reaches you through rapid SOS dispatch, home nursing, and a live donor network.
          </motion.p>
        </div>

        {/* 3-Column Glassmorphism Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ⚡ CARD 1: Rapid Ambulance (Cyan Radar Theme) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-500 p-8 flex flex-col h-[400px] group"
          >
            <div className="relative z-10 flex-grow">
               <h3 className="text-xl font-bold text-white mb-2">Rapid SOS Routing</h3>
               <p className="text-slate-400 text-sm">GPS-guided ambulance dispatch synchronized with the nearest hospital's Emergency Room.</p>
            </div>
            
            {/* Visual: Cyan Radar Animation */}
            <div className="relative z-10 h-40 w-full flex items-center justify-center overflow-hidden">
               <div className="w-32 h-32 rounded-full border border-cyan-500/20 relative flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full border border-cyan-500/40 relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"></div>
                 </div>
                 {/* Sweeping Radar */}
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 rounded-full"
                   style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(34, 211, 238, 0.4) 100%)' }}
                 />
                 {/* Blinking Location Dot */}
                 <motion.div 
                   animate={{ opacity: [0, 1, 0] }}
                   transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                   className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]"
                 />
               </div>
            </div>
          </motion.div>

          {/* 🩸 CARD 2: Blood Network (Amber Nodes Theme) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] hover:border-amber-500/30 transition-all duration-500 p-8 flex flex-col h-[400px] group"
          >
            <div className="relative z-10 flex-grow">
               <h3 className="text-xl font-bold text-white mb-2">Live Blood Network</h3>
               <p className="text-slate-400 text-sm">Real-time inventory mapping across regional blood banks and registered voluntary donors.</p>
            </div>
            
            {/* Visual: Amber Glowing Nodes */}
            <div className="relative z-10 h-40 w-full flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 200 150" className="absolute inset-0">
                <motion.path 
                  d="M 50 100 L 100 50 L 150 90" 
                  stroke="rgba(245, 158, 11, 0.3)" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="5,5"
                />
                <motion.circle cx="50" cy="100" r="4" fill="#f59e0b" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="100" cy="50" r="6" fill="#fbbf24" style={{ filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                <motion.circle cx="150" cy="90" r="4" fill="#f59e0b" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
              </svg>
              <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-mono backdrop-blur-sm mt-10">
                MATCH FOUND
              </div>
            </div>
          </motion.div>

          {/* 🏡 CARD 3: Premium Home Care (Light Sage Green Theme) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] hover:border-[#bfe2ca]/40 transition-all duration-500 p-8 flex flex-col h-[400px] group"
          >
            <div className="relative z-10 flex-grow">
               <h3 className="text-xl font-bold text-white mb-2">Premium Home Care</h3>
               <p className="text-slate-400 text-sm">ICU-grade setups, certified nursing, and diagnostic sample collection right at your doorstep.</p>
            </div>
            
            {/* Visual: Soft Sage Green Pulse */}
            <div className="relative z-10 h-40 w-full flex items-center justify-center">
               <div className="relative flex items-center justify-center">
                 {/* Pulsing Aura */}
                 <motion.div 
                   animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                   className="absolute w-12 h-12 rounded-full bg-[#bfe2ca]/30"
                 />
                 <motion.div 
                   animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                   transition={{ duration: 3, repeat: Infinity, delay: 1, ease: "easeOut" }}
                   className="absolute w-12 h-12 rounded-full bg-[#bfe2ca]/40"
                 />
                 {/* Center Element */}
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#bfe2ca] to-emerald-400 z-10 flex items-center justify-center shadow-[0_0_20px_rgba(191,226,202,0.5)]">
                   <svg className="w-6 h-6 text-[#010c0c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                   </svg>
                 </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}