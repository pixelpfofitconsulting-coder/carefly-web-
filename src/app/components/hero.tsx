// File: src/components/Hero.tsx
// Function: Main landing page hero section with 3D floating cards and interactive mouse animations.

'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // 3D Rotation effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 sm:pt-24 sm:pb-20 overflow-hidden bg-[#010c0c] text-white">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' }}>
         <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen scale-105" src="/hero-bg.mp4" />
      </div>

      {/* Main Content Container - ensuring no horizontal overflow */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-900/30 border border-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Integrated Digital Healthcare
          </div>

          {/* Adjusted text size for mobile */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.05] bg-gradient-to-br from-white via-slate-200 to-teal-500 bg-clip-text text-transparent drop-shadow-lg">
            Intelligence <br/> in Motion.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-light">
            Your complete healthcare marketplace. Seamlessly book doctor appointments, track live clinic queues, manage diagnostic reports, and access automated e-prescriptions in one secure health locker.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a href="#download-patient" className="group relative w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-white text-slate-950 font-bold text-sm tracking-wide transition-all overflow-hidden text-center">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Patient App (.aab)</span>
            </a>
            <a href="#download-partner" className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-white font-semibold text-sm tracking-wide transition-all backdrop-blur-xl text-center">
              Partner Hub (.exe)
            </a>
          </div>
        </div>

        {/* Right Content: 3D Card */}
        <div className="lg:col-span-5 relative perspective-1000 mt-8 lg:mt-0">
          <div className="absolute -inset-1 rounded-[34px] bg-[conic-gradient(from_0deg_at_50%_50%,#010c0c_0%,#10b981_50%,#010c0c_100%)] opacity-30 blur-xl animate-[spin_4s_linear_infinite]" />

          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative z-10 backdrop-blur-3xl bg-slate-950/40 border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden cursor-crosshair w-full"
          >
            <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }} />

            <div className="relative z-10" style={{ transform: "translateZ(30px) sm:translateZ(50px)" }}>
              <div className="flex justify-between items-center mb-6 sm:mb-8 border-b border-white/10 pb-4">
                <span className="text-[10px] sm:text-xs font-mono text-emerald-400">LIVE_SYSTEM_SYNC</span>
                <span className="text-[10px] sm:text-xs text-emerald-500/80 font-mono flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  SECURE VAULT
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors">
                  <p className="text-xs sm:text-sm font-semibold text-white mb-1">Health Locker Synchronization</p>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden mt-2">
                    <div className="bg-emerald-400 h-1.5 rounded-full w-[100%] relative">
                       <div className="absolute inset-0 bg-white/50 w-full animate-[pulse_1.5s_ease-in-out_infinite]" />
                    </div>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 mt-2 text-right">E-Prescription Updated</p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-teal-500/30 transition-colors flex justify-between items-center">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-white">Live Queue Status</p>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1">Real-time patient tracking</p>
                  </div>
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-teal-500/10 text-teal-400 text-[10px] sm:text-xs font-mono rounded-full border border-teal-500/20">ACTIVE</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}