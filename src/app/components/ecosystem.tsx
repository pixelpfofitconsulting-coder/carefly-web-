// file: src/components/ecosystem.tsx
// logic: 
// 1. Interactive 3D Medical Ecosystem Network.
// 2. FIXED (SVG Gradient Bug): Added gradientUnits="userSpaceOnUse" to prevent linear gradients from collapsing on perfectly horizontal (0, 180 degrees) or vertical lines.
// 3. FIXED (Hydration Error): Added .toFixed(2) to Math calculations and 'isMounted' window check.

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, 
  Building2, 
  TestTube2, 
  Ambulance, 
  Droplet, 
  HeartHandshake,
  Database
} from 'lucide-react';

const ecosystemNodes = [
  {
    id: 'doctors',
    title: 'Doctors & Specialists',
    icon: Stethoscope,
    angle: 0,
    color: 'from-emerald-400 to-teal-400',
    shortDesc: 'Live Queue & E-Prescriptions',
    fullDesc: 'Doctors generate e-prescriptions that instantly sync to the vault. Live queues are updated in real-time for patients.'
  },
  {
    id: 'clinics',
    title: 'Clinics & Hospitals',
    icon: Building2,
    angle: 60,
    color: 'from-teal-400 to-cyan-400',
    shortDesc: 'Smart Slot Management',
    fullDesc: 'Seamlessly manage patient flow, ward availability, and integrate with ambulance ETA for emergency readiness.'
  },
  {
    id: 'diagnostics',
    title: 'Diagnostic Centers',
    icon: TestTube2,
    angle: 120,
    color: 'from-cyan-400 to-blue-400',
    shortDesc: 'Auto Report Syncing',
    fullDesc: 'Test reports are automatically pushed to the patient\'s health locker and the referring doctor\'s dashboard. Zero paper.'
  },
  {
    id: 'ambulance',
    title: 'Ambulance & ER',
    icon: Ambulance,
    angle: 180,
    color: 'from-red-400 to-rose-500',
    shortDesc: 'GPS & Bed Syncing',
    fullDesc: 'Paramedics transmit live patient vitals to the destination clinic. GPS routing ensures the hospital is prepped before arrival.'
  },
  {
    id: 'blood',
    title: 'Blood Banks',
    icon: Droplet,
    angle: 240,
    color: 'from-rose-500 to-pink-500',
    shortDesc: 'Real-time Inventory',
    fullDesc: 'Instantly locate required blood groups across the network. Clinics can send automated requisitions during emergencies.'
  },
  {
    id: 'homecare',
    title: 'Home Care Units',
    icon: HeartHandshake,
    angle: 300,
    color: 'from-emerald-300 to-green-500',
    shortDesc: 'Remote Monitoring',
    fullDesc: 'Nurses log daily patient vitals at home, which directly syncs with the primary physician\'s monitoring dashboard.'
  }
];

export default function Ecosystem() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const defaultCore = {
    title: "CareFly Secure Vault",
    desc: "The neural brain of the ecosystem. All medical data, prescriptions, and live tracking converge here seamlessly."
  };

  const activeNode = ecosystemNodes.find(n => n.id === hoveredNode);

  return (
    <section className="relative w-full min-h-screen bg-[#010c0c] flex items-center justify-center overflow-hidden py-20 font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase backdrop-blur-md mb-6"
          >
            <Database className="w-4 h-4" />
            Unified Architecture
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight"
          >
            The CareFly <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Ecosystem</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-4 max-w-2xl mx-auto"
          >
            Hover over any network node to see how real-time data flows frictionlessly across our unified healthcare architecture.
          </motion.p>
        </div>

        <div className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px] flex items-center justify-center mt-10">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              {/* Added gradientUnits="userSpaceOnUse" to fix horizontal/vertical line rendering bugs */}
              <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {ecosystemNodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const radius = !isMounted ? 300 : (isMobile ? 175 : 300);
              
              const xOffset = (Math.cos(rad) * radius).toFixed(2);
              const yOffset = (Math.sin(rad) * radius).toFixed(2);
              
              const x2 = `calc(50% + ${xOffset}px)`;
              const y2 = `calc(50% + ${yOffset}px)`;
              const isHovered = hoveredNode === node.id;

              return (
                <g key={`line-${node.id}`}>
                  {/* Increased opacity of base dashed line from 0.05 to 0.15 for better visibility */}
                  <line 
                    x1="50%" y1="50%" 
                    x2={x2} y2={y2} 
                    stroke="rgba(255,255,255,0.15)" 
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <motion.line 
                    x1="50%" y1="50%" 
                    x2={x2} y2={y2} 
                    stroke="url(#glowLine)" 
                    strokeWidth={isHovered ? "3" : "0"}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: isHovered ? 1 : 0,
                      opacity: isHovered ? 1 : 0 
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                  {isHovered && (
                    <motion.circle
                      r="4"
                      fill="#34d399"
                      className="filter drop-shadow-[0_0_8px_#34d399]"
                      initial={{ cx: "50%", cy: "50%" }}
                      animate={{ cx: x2, cy: y2 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          <div className="absolute z-20 w-48 h-48 md:w-64 md:h-64 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_-15px_rgba(16,185,129,0.3)] flex flex-col items-center justify-center text-center p-6 transition-all duration-500">
            <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-teal-500/20 animate-[spin_15s_linear_infinite_reverse]" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredNode || 'core'}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                {activeNode ? (
                  <>
                    <activeNode.icon className="w-8 h-8 text-emerald-400 mb-3" />
                    <h3 className="text-sm font-bold text-white mb-2">{activeNode.title}</h3>
                    <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed">{activeNode.fullDesc}</p>
                  </>
                ) : (
                  <>
                    <CareFlyGlowLogo />
                    <h3 className="text-sm font-bold text-emerald-400 mt-4 mb-2">{defaultCore.title}</h3>
                    <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed">{defaultCore.desc}</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {ecosystemNodes.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const radius = !isMounted ? 300 : (isMobile ? 175 : 300);
            
            const xOffset = (Math.cos(rad) * radius).toFixed(2);
            const yOffset = (Math.sin(rad) * radius).toFixed(2);
            
            return (
              <motion.div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="absolute z-30 group cursor-crosshair"
                style={{
                  left: `calc(50% + ${Math.cos(rad) * 100}%)`,
                  top: `calc(50% + ${Math.sin(rad) * 100}%)`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ x: "-50%", y: "-50%", left: "50%", top: "50%" }}
                animate={{
                  left: `calc(50% + ${xOffset}px)`,
                  top: `calc(50% + ${yOffset}px)`,
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              >
                <div className={`
                  relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center
                  bg-slate-900/90 backdrop-blur-md border border-white/10 
                  transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]
                  ${hoveredNode === node.id ? 'border-emerald-500/50' : 'hover:border-emerald-500/30'}
                `}>
                  <node.icon className={`w-6 h-6 md:w-7 md:h-7 text-white opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute top-full mt-4 w-32 md:w-40 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`text-xs font-bold bg-gradient-to-r ${node.color} bg-clip-text text-transparent`}>
                      {node.title}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider">
                      {node.shortDesc}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CareFlyGlowLogo() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 relative z-10">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#grad1)" />
        <path d="M2 17L12 22L22 17" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="grad1" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="grad2" x1="2" y1="12" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}