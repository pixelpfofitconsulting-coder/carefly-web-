// File: src/app/join/page.tsx
// Architecture: Premium Dark Glassmorphism Lead Generation Form
// Backend: Connected to Supabase 'partners_waitlist_carefly' table.

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { supabase } from '../../lib/supabase';
import { CheckCircle2, Building2, User, Phone, Mail, MapPin, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function JoinNetwork() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    contact_person_name: '',
    organization_name: '',
    partner_type: 'Doctor',
    phone_number: '',
    email_address: '',
    city: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Supabase Data Insertion Logic
      const { error } = await supabase
        .from('partners_waitlist_carefly')
        .insert([formData]);

      if (error) throw error;

      // Show Success Animation
      setIsSuccess(true);
    } catch (error: any) {
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#010c0c] relative selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <div className="relative pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto z-10">
        
        {/* Ambient Glow */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
         
        {/* PROPER ALIGNED: Back to Home Button (Independent of the flex grid below) */}
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

        {/* Flex Container for Form and Content */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left Side: Copywriting & Value Proposition */}
          <div className="w-full md:w-1/2 text-center md:text-left relative z-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
                Partner With Us
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">CareFly</span> Ecosystem.
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Empower your practice with next-gen digital infrastructure. Zero booking fees from patients, smart live queues, and seamless medical data syncing.
              </p>
              <div className="flex flex-col gap-4 text-slate-300">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> <span>B2B Wallet Model for Transparent Earnings</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> <span>Unified E-Prescription & Diagnostic Vault</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> <span>Eliminate Crowded Waiting Rooms</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: The Glassmorphism Form */}
          <div className="w-full md:w-1/2 relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-semibold ml-1">Contact Person Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input required type="text" name="contact_person_name" value={formData.contact_person_name} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="Dr. John Doe" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-semibold ml-1">Organization Name *</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input required type="text" name="organization_name" value={formData.organization_name} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="Care Clinic" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-semibold ml-1">Partner Type *</label>
                      <select name="partner_type" value={formData.partner_type} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer">
                        <option className="bg-slate-900" value="Doctor">Independent Doctor / Specialist</option>
                        <option className="bg-slate-900" value="Clinic">Clinic / Hospital</option>
                        <option className="bg-slate-900" value="Diagnostic">Diagnostic Center / Lab</option>
                        <option className="bg-slate-900" value="HomeCare">Home Care Unit</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-semibold ml-1">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input required type="tel" name="phone_number" value={formData.phone_number} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="+91 90000 00000" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-semibold ml-1">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input required type="email" name="email_address" value={formData.email_address} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="doctor@clinic.com" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-semibold ml-1">City / Location *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="Agartala, Tripura" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-semibold ml-1">Additional Message (Optional)</label>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors resize-none" placeholder="Tell us about your specialties or network size..." />
                    </div>

                    {errorMessage && <p className="text-red-400 text-xs text-center">{errorMessage}</p>}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Submit Application <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-sm">
                      Thank you for your interest in the CareFly Ecosystem. Our onboarding team from Pixel & Profit Consulting will contact you shortly.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-emerald-400 text-sm font-semibold hover:text-white transition-colors border border-emerald-500/30 px-6 py-2 rounded-full"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}