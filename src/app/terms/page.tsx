// File: src/app/terms/page.tsx
// Architecture: Premium Legal Document Page (Dark Glassmorphism)
// Logic: Custom B2B Wallet business model, Platform liability disclaimers, Pixel & Profit IP, Kolkata Jurisdiction.

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { Scale, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#010c0c] relative selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <div className="relative pt-32 pb-24 px-6 max-w-4xl mx-auto z-10">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* PROPER ALIGNED: Back to Home Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-start mb-8 md:mb-12 relative z-20"
        >
          <Link href="/">
            <button className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-900/20 backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              Back to Home
            </button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <Scale className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Conditions</span>
          </h1>
          <p className="text-slate-400">Operated by Pixel & Profit Consulting</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 text-slate-300 space-y-8 shadow-2xl"
        >
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 1. Platform Role & Liability
            </h2>
            <p className="leading-relaxed text-sm">
              CareFly is a technology platform acting as a digital bridge between patients and healthcare providers (Doctors, Clinics, Diagnostic Hubs, Home Care). CareFly itself does not provide medical advice, diagnosis, or treatment. Pixel & Profit Consulting shall not be held liable for any medical malpractice, misdiagnosis, service delays, or negligence on the part of the independent healthcare providers using our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 2. Payment & B2B Wallet Policy
            </h2>
            <p className="leading-relaxed text-sm">
              <strong>For Patients:</strong> The CareFly platform is fundamentally free to use for booking appointments and managing health data. We do not directly collect booking fees or consultation charges from patients. All such payments are settled directly with the respective healthcare provider.
              <br /><br />
              <strong>For Partners (Providers):</strong> CareFly operates on a digital B2B Wallet model. Platform commissions and operational charges are deducted directly from the registered partner's digital wallet. 
            </p>
          </section>

          <section id="refund" className="scroll-mt-32">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 3. Refunds & Cancellations
            </h2>
            <p className="leading-relaxed text-sm">
              Because CareFly does not collect direct payments from patients, any claims for refunds resulting from appointment cancellations, no-shows, or unfulfilled services must be directed to the specific clinic or doctor. CareFly acts only as a facilitator and cannot process direct patient refunds.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 4. Emergency Situations
            </h2>
            <p className="leading-relaxed text-sm">
              While CareFly offers rapid SOS routing and ambulance dispatch networking, the platform is not a replacement for extreme, life-threatening emergency services. In severe medical crises, users must immediately contact their local government emergency hotlines alongside utilizing CareFly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 5. Intellectual Property
            </h2>
            <p className="leading-relaxed text-sm">
              The "CareFly" brand name, logo, UI/UX architecture, source code, and underlying "Unified Healthcare Ecosystem" logic are the exclusive Intellectual Property (IP) of Pixel & Profit Consulting. Unauthorized reproduction or reverse engineering is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 6. Governing Law & Jurisdiction
            </h2>
            <p className="leading-relaxed text-sm">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any legal disputes, claims, or controversies arising out of or in connection with the CareFly platform shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Kolkata, West Bengal</strong>.
            </p>
          </section>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}