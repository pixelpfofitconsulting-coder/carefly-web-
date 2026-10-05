// File: src/components/Footer.tsx
// Architecture: Premium Dark Glassmorphism Footer
// Logic & Tech:
// 1. Integrates "Pixel & Profit Consulting" branding.
// 2. Updated Contact Info: Kolkata Jurisdiction and direct Phone Number.
// 3. Smart Links: Direct anchor to Refunds section and separate /join page.

'use client';

import React from 'react';
import CareFlyLogo from './careflylogo';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#010c0c] border-t border-white/10 pt-16 pb-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-t-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <CareFlyLogo className="w-10 h-10" />
              <span className="text-white font-black text-2xl tracking-wide bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                CareFly
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              A unified healthcare ecosystem perfectly synchronized to eliminate friction between patients, doctors, and diagnostic hubs.
            </p>
            <div className="flex items-center gap-4 mt-4">
              {/* Facebook SVG */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-white/10 hover:border-emerald-500/30 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* X (Twitter) SVG */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-white/10 hover:border-emerald-500/30 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn SVG */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-white/10 hover:border-emerald-500/30 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg mb-2">Platform</h4>
            <a href="#platform" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">The Ecosystem</a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">For Patients</a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">For Doctors</a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Diagnostic Hubs</a>
          </div>

          {/* Column 3: Legal & Compliance */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg mb-2">Legal</h4>
            <a href="/privacy" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Terms & Conditions</a>
            <a href="/terms#refund" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Refund Policy</a>
            
            {/* Direct Link to the future /join page */}
            <a href="/join" className="text-emerald-400 font-semibold text-sm transition-colors mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Join the Network
            </a>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg mb-2">Contact Us</h4>
            <div className="flex items-start gap-3 text-slate-400 text-sm">
              <MapPin className="w-5 h-5 shrink-0 text-emerald-500/70" />
              <span>Kolkata, West Bengal, India</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm mt-2">
              <Mail className="w-5 h-5 shrink-0 text-emerald-500/70" />
              <span>support@carefly.in</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm mt-2">
              <Phone className="w-5 h-5 shrink-0 text-emerald-500/70" />
              <span>+91 7005304526</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

        {/* Bottom Section: Copyright & Pixel and Profit Consulting */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            &copy; {currentYear} CareFly. All rights reserved.
          </p>
          
          <div className="px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <p className="text-slate-400 text-xs text-center md:text-right">
              Architected & Developed by <span className="font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Pixel & Profit Consulting</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}