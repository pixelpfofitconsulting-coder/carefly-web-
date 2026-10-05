// File: src/app/privacy/page.tsx
// Architecture: Premium Legal Document Page (Dark Glassmorphism)
// Logic: Complies with Google Play Store's Data Safety requirements (Account Deletion, Data Sovereignty, GPS usage).

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#010c0c] relative selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <div className="relative pt-32 pb-24 px-6 max-w-4xl mx-auto z-10">
        {/* Ambient Glow */}
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
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Policy</span>
          </h1>
          <p className="text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </motion.div>

        {/* Glassmorphism Document Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 text-slate-300 space-y-8 shadow-2xl"
        >
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 1. Medical Data Sovereignty
            </h2>
            <p className="leading-relaxed text-sm">
              At CareFly, we treat your medical data with the highest level of security. All prescriptions, lab reports, and medical histories stored in your 'Health Vault' are end-to-end encrypted. CareFly (operated by Pixel & Profit Consulting) does not have access to read, sell, or share your personal health records with any third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 2. Information We Collect
            </h2>
            <p className="leading-relaxed text-sm mb-3">To provide a frictionless healthcare ecosystem, we collect:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
              <li><strong>Profile Data:</strong> Name, age, gender, and contact information.</li>
              <li><strong>Location Data (GPS):</strong> Used exclusively during Ambulance dispatch or Home Care routing to ensure rapid emergency response. Location is not tracked in the background unless actively using these services.</li>
              <li><strong>Ecosystem Data:</strong> Appointment logs, live queue status, and diagnostic test requisitions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 3. Data Deletion & User Rights
            </h2>
            <p className="leading-relaxed text-sm">
              In compliance with Google Play Store policies, you retain full control over your data. You can request the complete deletion of your account and associated medical records at any time directly through the CareFly App settings or by emailing support@carefly.in. Upon request, all personal data is permanently wiped from our servers within 7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 4. Third-Party Integrations
            </h2>
            <p className="leading-relaxed text-sm">
              Your data is only shared with verified healthcare partners (Doctors, Clinics, Labs) within the CareFly ecosystem *only when you initiate a booking or consent to a data transfer*. We do not broker data.
            </p>
          </section>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}