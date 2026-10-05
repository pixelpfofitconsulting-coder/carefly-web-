// File: src/components/MissionVision.tsx
// Architecture: Premium Dark Glassmorphism + Apple-Inspired Industrial Aesthetics
// Logic: Framer Motion scroll reveals, Breathing border animations, and Golden Metallic Screws.

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass } from 'lucide-react';

export default function MissionVision() {
  // Industrial Hardware: 4-Pin Golden Metallic Screw Component
  const MetallicScrew = ({ position }: { position: string }) => (
    <div className={`absolute ${position} w-[10px] h-[10px] rounded-full bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 border border-amber-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center`}>
      <div className="w-[1px] h-[6px] bg-amber-900/60 rotate-45" />
      <div className="w-[6px] h-[1px] bg-amber-900/60 absolute rotate-45" />
    </div>
  );

  return (
    <section className="relative w-full py-24 bg-[#010c0c] overflow-hidden">
      {/* Ambient Background Glow (Emerald & Cyan) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            Our Philosophy
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Driving the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Future</span> of Care.
          </h2>
        </motion.div>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* ================= CARD 1: THE MISSION ================= */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:shadow-[0_0_50px_rgba(16,185,129,0.15)] hover:border-emerald-500/40 transition-all duration-700"
          >
            {/* 4-Pin Metallic Screws */}
            <MetallicScrew position="top-5 left-5" />
            <MetallicScrew position="top-5 right-5" />
            <MetallicScrew position="bottom-5 left-5" />
            <MetallicScrew position="bottom-5 right-5" />

            {/* Breathing Border Glow Effect (Hover) */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none transition-opacity duration-700" />

            <div className="relative z-10 mt-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Target className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wide flex items-center gap-3">
                The Mission
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light">
                To engineer a <strong className="text-emerald-400 font-semibold">frictionless healthcare infrastructure</strong> that unifies patients, healthcare professionals, and diagnostic hubs into one synchronized ecosystem. We are committed to dismantling the complexities of medical appointments, live queue management, and data fragmentation. By empowering our B2B partners with advanced digital tools, we ensure that every patient receives streamlined, transparent, and high-quality care without administrative delays.
              </p>
            </div>
          </motion.div>

          {/* ================= CARD 2: THE VISION ================= */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="group relative bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-[0_0_30px_rgba(6,182,212,0.05)] hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:border-cyan-500/40 transition-all duration-700"
          >
            {/* 4-Pin Metallic Screws */}
            <MetallicScrew position="top-5 left-5" />
            <MetallicScrew position="top-5 right-5" />
            <MetallicScrew position="bottom-5 left-5" />
            <MetallicScrew position="bottom-5 right-5" />

            {/* Breathing Border Glow Effect (Hover) */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none transition-opacity duration-700" />

            <div className="relative z-10 mt-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Compass className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wide flex items-center gap-3">
                The Vision
                <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light">
                To be the <strong className="text-cyan-400 font-semibold">definitive technological backbone</strong> of modern healthcare. We envision a future where secure medical data sovereignty, instant emergency network routing (SOS), and seamless partner collaboration become the standard. CareFly aims to bridge the gap between critical medical needs and rapid execution, creating a self-sustaining network where health meets intelligence.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}