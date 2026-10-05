'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function CareFlyLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 250 250" className="w-full h-full overflow-visible drop-shadow-xl">
        <defs>
          <linearGradient id="handGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A3D1C" />
            <stop offset="50%" stopColor="#1B5E20" />
            <stop offset="100%" stopColor="#0A3D1C" />
          </linearGradient>

          <radialGradient id="sphereGradient" cx="50%" cy="50%" r="50%">
            <stop offset="20%" stopColor="#FFD54F" />
            <stop offset="60%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="rgba(230, 81, 0, 0.9)" />
          </radialGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* 🚀 New Native SVG Filter for the Bird's Shadow (Works perfectly on Mobile & Laptop) */}
          <filter id="birdShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 🟠 The Glowing Energy Sphere */}
        <motion.circle
          cx="125"
          cy="125"
          r="80"
          fill="url(#sphereGradient)"
          filter="url(#glow)"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "125px 125px" }}
        />

        {/* 🤲 The Caring Hands */}
        <path d="M 125 250 Q 25 225 12.5 100 Q 37.5 175 100 212.5 Z" fill="url(#handGradient)" />
        <path d="M 125 250 Q 225 225 237.5 100 Q 212.5 175 150 212.5 Z" fill="url(#handGradient)" />

        {/* 🦅 The Flapping Bird */}
        <motion.g 
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.path 
            animate={{ d: [
              "M 125 155 Q 89 131 65 95 Q 101 107 119 131 Q 149 107 185 95 Q 161 131 125 155 Z", // Wing Down
              "M 125 155 Q 89 116 65 81 Q 101 96 119 131 Q 149 96 185 81 Q 161 116 125 155 Z", // Wing Up
              "M 125 155 Q 89 131 65 95 Q 101 107 119 131 Q 149 107 185 95 Q 161 131 125 155 Z"  // Wing Down
            ]}}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            fill="#ffffff"
           // filter="url(#birdShadow)" // 🚀 Using Native SVG Filter instead of CSS style
          />
        </motion.g>
      </svg>
    </div>
  );
}