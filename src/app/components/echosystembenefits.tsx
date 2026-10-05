'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// File Name: EcosystemBenefits.tsx
// Architecture: Interactive State-Driven Glassmorphism Tab System
// Logic & Tech:
// 1. React 'useState' manages the currently active tab (Patients, Doctors, etc.).
// 2. Framer Motion 'AnimatePresence' (mode="wait") ensures smooth Exit & Enter animations without overlapping.
// 3. 'min-h-[550px]' is applied to the glass panel to prevent mobile browsers from collapsing height to zero during transitions.
// 4. Dynamic background glows and gradients adapt instantly to the active tab's specific theme color.
// 5. Renders a unified ERP graph simulation exclusively for the 'Doctors' & 'Diagnostics' tabs.
// ============================================================================

const tabs = [
  {
    id: 'patients',
    label: 'For Patients',
    themeColor: 'emerald',
    gradient: 'from-emerald-400 to-teal-500',
    glow: 'bg-emerald-500/10',
    borderHover: 'hover:border-emerald-500/40',
    tagline: 'The Ultimate Healthcare Remote.',
    features: [
      { title: 'Zero Waiting Time', desc: 'Skip the crowded waiting rooms. Track your live serial number from home and arrive exactly when it is your turn.' },
      { title: 'Sovereign Health Vault', desc: 'Secure your lifetime prescriptions, test reports, and medical history in a single, end-to-end encrypted vault.' },
      { title: 'Unified Ecosystem', desc: 'Seamlessly book doctors, schedule diagnostic tests, and request home care—all within one highly connected platform.' }
    ]
  },
  {
    id: 'doctors',
    label: 'For Doctors',
    themeColor: 'cyan',
    gradient: 'from-cyan-400 to-blue-500',
    glow: 'bg-cyan-500/10',
    borderHover: 'hover:border-cyan-500/40',
    tagline: 'A Complete Digital Clinic.',
    features: [
      { title: 'Automated Queue & Smart Rx', desc: 'Experience automated serial management and push e-prescriptions directly to your patient\'s vault with a single click.' },
      { title: 'Unified Lab Sync', desc: 'Receive patient reports directly into your system from diagnostic labs instantly, eliminating all paperwork.' },
      { title: 'Clinic Finance & Analytics', desc: 'Manage your clinic\'s daily revenue, expenses, profit margins, and staff operations in real-time through an integrated ERP dashboard.' }
    ]
  },
  {
    id: 'diagnostics',
    label: 'For Diagnostics',
    themeColor: 'amber',
    gradient: 'from-amber-400 to-orange-500',
    glow: 'bg-amber-500/10',
    borderHover: 'hover:border-amber-500/40',
    tagline: 'The Smart Lab Operating System.',
    features: [
      { title: '360° Lab Operations', desc: 'From automated slot booking to report generation and direct pushing to patient IDs—manage everything seamlessly.' },
      { title: 'Smart Inventory Control', desc: 'Monitor lab reagents, equipment, and supply chain with real-time inventory tracking and automated shortage alerts.' },
      { title: 'Integrated ERP & Accounting', desc: 'Generate instant invoices, track daily expenses, and analyze automated Profit & Loss (P&L) statements with our full-scale financial dashboard.' }
    ]
  },
  {
    id: 'homecare',
    label: 'For Home Care',
    themeColor: 'teal',
    gradient: 'from-[#bfe2ca] to-teal-500',
    glow: 'bg-[#bfe2ca]/10',
    borderHover: 'hover:border-[#bfe2ca]/40',
    tagline: 'Enterprise-Grade Home Care.',
    features: [
      { title: 'Optimized Dispatching', desc: 'Utilize live GPS routing for nurses and sample collectors to reach patients faster with optimized dispatching.' },
      { title: 'Live Clinical Sync', desc: 'Sync real-time health data and vitals of bed-ridden patients directly into the core healthcare ecosystem.' },
      { title: 'Operational Tracking', desc: 'Keep full control over service invoicing, staff payroll, travel expenses, and comprehensive unit accounting at your fingertips.' }
    ]
  }
];

export default function EcosystemBenefits() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    // Removed overflow-clip from main section so mobile scrolling doesn't break
    <section id="benefits" className="relative w-full py-24 bg-[#010c0c] min-h-screen flex flex-col justify-center">
      
      {/* Dynamic Ambient Background Glow */}
      <motion.div 
        key={activeTab.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none ${activeTab.glow}`} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            One Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white">Architecture.</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-light">
            Designed to empower every stakeholder in the healthcare supply chain with enterprise-grade tools.
          </p>
        </div>

        {/* 📱 Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full mx-auto w-fit mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 relative">
          {tabs.map((tab) => {
            const isActive = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 🪟 The Main Glassmorphism Display Panel with min-height for Mobile safety */}
        <div className={`relative rounded-[40px] overflow-hidden bg-white/[0.02] border border-white/[0.05] ${activeTab.borderHover} transition-colors duration-500 backdrop-blur-3xl min-h-[550px] p-8 md:p-12 shadow-2xl`}>
          
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

          {/* AnimatePresence mode="wait" ensures old content leaves completely before new content enters */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full"
            >
              
              {/* Left Side: Content & Features */}
              <div className="w-full">
                <h3 className={`text-2xl md:text-4xl font-black mb-8 bg-gradient-to-r ${activeTab.gradient} bg-clip-text text-transparent`}>
                  {activeTab.tagline}
                </h3>
                
                <div className="space-y-6">
                  {activeTab.features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (idx * 0.1) }}
                      className="flex gap-4"
                    >
                      <div className={`mt-1 w-6 h-6 shrink-0 rounded-full flex items-center justify-center bg-white/5 border border-white/10 shadow-[0_0_10px_${activeTab.glow}]`}>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeTab.gradient}`} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base mb-1">{feature.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side: Abstract Dynamic Visuals */}
              <div className="hidden lg:flex justify-center items-center h-full w-full">
                <div className="relative w-80 h-80 rounded-full border border-white/5 flex items-center justify-center">
                  
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 rounded-full border-l-2 border-r-2 border-dashed opacity-30 ${
                      activeTab.id === 'patients' ? 'border-emerald-400' :
                      activeTab.id === 'doctors' ? 'border-cyan-400' :
                      activeTab.id === 'diagnostics' ? 'border-amber-400' : 'border-[#bfe2ca]'
                    }`}
                  />
                  
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${activeTab.gradient} opacity-20 blur-2xl absolute`} />

                  <div className="relative z-10 w-48 h-48 bg-slate-950/80 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md p-6 flex flex-col justify-between overflow-hidden">
                    
                    <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                       <div className="w-12 h-2 rounded-full bg-white/20" />
                       <div className={`w-2 h-2 rounded-full animate-pulse bg-gradient-to-r ${activeTab.gradient}`} />
                    </div>

                    <div className="space-y-3 flex-grow">
                      <motion.div animate={{ width: ["30%", "80%", "50%"] }} transition={{ duration: 3, repeat: Infinity }} className={`h-2 rounded-full bg-gradient-to-r ${activeTab.gradient} opacity-50`} />
                      <motion.div animate={{ width: ["80%", "40%", "90%"] }} transition={{ duration: 4, repeat: Infinity }} className={`h-2 rounded-full bg-gradient-to-r ${activeTab.gradient} opacity-30`} />
                      <motion.div animate={{ width: ["50%", "100%", "30%"] }} transition={{ duration: 2.5, repeat: Infinity }} className={`h-2 rounded-full bg-gradient-to-r ${activeTab.gradient} opacity-10`} />
                    </div>

                    {/* ERP / Finance Bar simulation */}
                    {(activeTab.id === 'doctors' || activeTab.id === 'diagnostics') && (
                      <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-end">
                        <div className="w-4 h-8 bg-white/5 rounded-t-sm" />
                        <div className={`w-4 h-12 bg-gradient-to-t ${activeTab.gradient} rounded-t-sm`} />
                        <div className="w-4 h-6 bg-white/5 rounded-t-sm" />
                        <div className={`w-4 h-16 bg-gradient-to-t ${activeTab.gradient} rounded-t-sm`} />
                      </div>
                    )}

                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}