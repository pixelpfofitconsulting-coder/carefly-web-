'use client';

import React from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// File Name: BentoFeatures.tsx
// Architecture: Asymmetric CSS Grid (Bento Box) with Scroll-Triggered Animations
// Logic & Tech:
// 1. Uses Tailwind CSS Grid ('grid-cols-1 md:grid-cols-3') to create a responsive, modern bento layout.
// 2. Framer Motion 'whileInView' triggers slide-up animations only when the user scrolls to this section.
// 3. CRITICAL MOBILE FIX: Removed 'overflow-hidden' & 'overflow-clip' from the parent <section>. 
//    This allows mobile browser Intersection Observers (scroll sensors) to accurately detect when elements enter the screen.
// 4. 'viewport={{ once: true }}' ensures the entry animation runs only once, saving mobile battery and GPU.
// 5. Continuous micro-interactions (pulses, sweeping radar) are handled via lightweight CSS/Framer animations inside the cards.
// ============================================================================

export default function BentoFeatures() {
  return (
    // 🚀 Removed overflow-clip so mobile scroll sensors can detect the cards
    <section id="platform" className="relative w-full py-24 bg-[#010c0c]">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Intelligence <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">in Action.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto font-light"
          >
            A perfectly synchronized network designed to eliminate friction between patients, doctors, and diagnostic hubs.
          </motion.p>
        </div>

        {/* Bento Grid Layout (Asymmetric 3-Column) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* 🟢 CARD 1: Live Queue Tracking (Large - 2 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative md:col-span-2 rounded-[32px] overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-500 group flex flex-col justify-between p-8"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> LIVE
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Live Queue Tracking</h3>
              <p className="text-slate-400 text-sm max-w-sm">Watch your clinic serial number drop in real-time. Never sit in a crowded waiting room again.</p>
            </div>

            {/* Visual: Glowing Queue Number */}
            <div className="relative z-10 self-end md:absolute md:bottom-8 md:right-8 flex items-center gap-4">
              <div className="text-right">
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Current</p>
                <p className="text-2xl font-mono text-slate-300">03</p>
              </div>
              <div className="w-12 h-[2px] bg-white/10 relative overflow-hidden">
                 <motion.div 
                   animate={{ x: ["-100%", "100%"] }} 
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 w-full h-full bg-emerald-500" 
                 />
              </div>
              <div className="text-left bg-emerald-500/10 px-6 py-4 rounded-2xl border border-emerald-500/20">
                <p className="text-emerald-500 text-xs uppercase tracking-wider font-bold mb-1">Your Serial</p>
                <p className="text-5xl font-black font-mono text-white tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">04</p>
              </div>
            </div>
          </motion.div>

          {/* 🔵 CARD 2: Smart Booking (Medium - 1 Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="relative md:col-span-1 rounded-[32px] overflow-hidden bg-gradient-to-bl from-white/[0.04] to-transparent border border-white/[0.08] hover:border-teal-500/30 transition-all duration-500 group p-8 flex flex-col justify-between"
          >
            <div className="relative z-10">
               <h3 className="text-xl font-bold text-white mb-2">Smart Triage & Booking</h3>
               <p className="text-slate-400 text-sm">Instantly sync appointments with top doctors and diagnostic hubs.</p>
            </div>
            
            {/* Visual: Floating Nodes */}
            <div className="relative z-10 flex justify-center items-center h-32 mt-4">
               <div className="w-full max-w-[200px] flex justify-between items-center relative">
                 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0 border-dashed border-t border-teal-500/30"></div>
                 <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }} className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 z-10 flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.2)]">👨‍⚕️</motion.div>
                 <motion.div animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4 rounded-full bg-teal-400 z-10 shadow-[0_0_15px_rgba(20,184,166,0.8)]"></motion.div>
                 <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 3, repeat: Infinity }} className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 z-10 flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.2)]">🔬</motion.div>
               </div>
            </div>
          </motion.div>

          {/* 🟣 CARD 3: Personal E-Locker (Medium - 1 Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="relative md:col-span-1 rounded-[32px] overflow-hidden bg-gradient-to-tr from-white/[0.04] to-transparent border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-500 group p-8 flex flex-col justify-between"
          >
            <div className="relative z-10">
               <h3 className="text-xl font-bold text-white mb-2">Personal E-Locker</h3>
               <p className="text-slate-400 text-sm">Upload past records, MRI scans, and family health histories securely.</p>
            </div>
            
            {/* Visual: Glowing Folder */}
            <div className="relative z-10 flex justify-center items-center h-32 mt-4">
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 2 }}
                 className="w-20 h-16 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center relative overflow-hidden backdrop-blur-md"
               >
                 <div className="w-8 h-1 bg-indigo-400/50 rounded-full absolute top-3 left-4"></div>
                 <div className="w-12 h-1 bg-indigo-400/30 rounded-full absolute top-6 left-4"></div>
                 <motion.div 
                   animate={{ y: [20, -40] }} 
                   transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                   className="absolute w-6 h-8 bg-white/10 rounded border border-white/20"
                 />
               </motion.div>
            </div>
          </motion.div>

          {/* 🛡️ CARD 4: Sovereign Health Vault (Large - 2 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="relative md:col-span-2 rounded-[32px] overflow-hidden bg-gradient-to-tl from-white/[0.04] to-transparent border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-500 group flex flex-col md:flex-row items-center justify-between p-8"
          >
            <div className="relative z-10 max-w-sm mb-8 md:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono mb-4">
                🔒 END-TO-END ENCRYPTED
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Sovereign Health Vault</h3>
              <p className="text-slate-400 text-sm">Digital prescriptions and lab reports are pushed directly from the doctor's desk to your sovereign vault. Tamper-proof and always accessible.</p>
            </div>

            {/* Visual: Digital Prescription Unlock */}
            <div className="relative z-10 w-full md:w-auto flex justify-center pr-4">
               <motion.div 
                 whileHover={{ y: -10 }}
                 className="relative w-48 h-40 bg-slate-900/80 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
               >
                 {/* Top Bar */}
                 <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                   <div className="w-16 h-2 bg-emerald-500/20 rounded-full"></div>
                   <span className="text-[10px] text-emerald-400 font-mono">VERIFIED Rx</span>
                 </div>
                 {/* Fake Text Lines */}
                 <div className="space-y-2">
                   <div className="w-full h-2 bg-white/10 rounded-full"></div>
                   <div className="w-3/4 h-2 bg-white/10 rounded-full"></div>
                   <div className="w-5/6 h-2 bg-white/10 rounded-full"></div>
                 </div>
                 {/* Scanning Laser Line */}
                 <motion.div 
                   animate={{ top: ["10%", "90%", "10%"] }} 
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 w-full h-[2px] bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                 />
               </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}