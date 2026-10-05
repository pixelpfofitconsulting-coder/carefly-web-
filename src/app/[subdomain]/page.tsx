import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { 
  MapPin, Clock, Phone, Share2, 
  ShieldCheck, ChevronRight 
} from 'lucide-react';
import CareFlyLogo from '../components/careflylogo';

// ==========================================
// ১. ডেটাবেস কানেকশন (SSR)
// ==========================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================
// ২. ইন্টারফেস (Type Safety)
// ==========================================
interface Chamber {
  clinic_name: string;
  address: string;
  map_link: string;
  visiting_days: string;
  visiting_time: string;
  appointment_phone: string;
}

interface DoctorProfile {
  id: string;
  subdomain_slug: string;
  doctor_name: string;
  degrees: string;
  specialty: string;
  profile_image_url: string;
  experience_years: number;
  registration_info: string;
  bio_summary: string;
  languages_spoken: string[] | null;
  expertise_tags: string[] | null;
  chamber_schedules: Chamber[] | null;
  is_active: boolean;
}

// ==========================================
// ৩. এসইও মেটাডেটা (SEO)
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ subdomain: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const { data } = await supabase
    .from('doctor_portfolios_care')
    .select('doctor_name, specialty')
    .eq('subdomain_slug', resolvedParams.subdomain)
    .eq('is_active', true)
    .single();

  if (!data) return { title: 'Doctor Not Found | CareFly' };

  return {
    title: `${data.doctor_name} - ${data.specialty} | CareFly`,
    description: `Book an appointment with ${data.doctor_name}, ${data.specialty} on CareFly.`,
  };
}

// ==========================================
// ৪. মূল পেজ কম্পোনেন্ট (Dynamic & Premium UI)
// ==========================================
export default async function DoctorPortfolioPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const resolvedParams = await params;

  // Supabase Fetch
  const { data: doctor, error } = await supabase
    .from('doctor_portfolios_care')
    .select('*')
    .eq('subdomain_slug', resolvedParams.subdomain)
    .eq('is_active', true)
    .single();

  if (error || !doctor) {
    notFound();
  }

  const profile = doctor as DoctorProfile;
  const whatsappShareLink = `https://wa.me/?text=${encodeURIComponent(`Book an appointment with ${profile.doctor_name} on CareFly: https://${profile.subdomain_slug}.carefly.in`)}`;

  return (
    <main className="bg-[#0b0f19] min-h-screen pb-20 font-sans text-slate-100 selection:bg-[#00C8E1] selection:text-black">
      
      {/* নেভিগেশন বার (CareFly Official Animated SVG Logo Integrated) */}
      <nav className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <CareFlyLogo className="w-10 h-10" />
          <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
            Care<span className="text-[#00C8E1]">Fly</span>
          </span>
        </div>
        <a 
          href={whatsappShareLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-slate-800/80 border border-slate-700/60 p-2.5 rounded-full hover:bg-slate-700 text-slate-300 transition"
          title="Share Profile"
        >
          <Share2 size={18} />
        </a>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* ==========================================
            প্রিমিয়াম হিরো সেকশন (ডার্ক গ্লাসমরফিজম)
            ========================================== */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-8 mb-8 relative overflow-hidden">
          
          {/* ব্যাকগ্রাউন্ড সায়ান গ্লো ইফেক্ট */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00C8E1]/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative shrink-0">
            <img 
              src={profile.profile_image_url || 'https://via.placeholder.com/300'} 
              alt={profile.doctor_name}
              className="w-40 h-40 sm:w-52 sm:h-52 rounded-2xl object-cover shadow-xl border-2 border-slate-700"
            />
          </div>

          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1.5 bg-[#00C8E1]/10 text-[#00C8E1] border border-[#00C8E1]/20 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <ShieldCheck size={14} /> Verified CareFly Doctor
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">
              {profile.doctor_name}
            </h1>
            <p className="text-[#00C8E1] font-semibold text-sm sm:text-base mb-2">
              {profile.specialty}
            </p>
            <p className="text-slate-400 text-sm mb-4">
              {profile.degrees}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 mb-6 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              <span>💼 <strong className="text-white">{profile.experience_years}+ Years</strong> Experience</span>
              <span>•</span>
              <span className="truncate max-w-[280px]">🏛️ {profile.registration_info}</span>
            </div>

            <a 
              href="#chambers"
              className="inline-block bg-gradient-to-r from-[#00C8E1] to-cyan-500 hover:from-cyan-400 hover:to-cyan-600 text-slate-950 px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-[#00C8E1]/20 transition-all hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto text-center"
            >
              Book Appointment on CareFly
            </a>
          </div>
        </div>

        {/* ==========================================
            বেন্টো গ্রিড (About, Expertise, Qualifications)
            ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* About Card */}
          <div className="bg-[#111827] rounded-3xl p-6 shadow-lg border border-slate-800/80 flex flex-col hover:border-[#00C8E1]/40 transition duration-300">
            <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-[#00C8E1]"></span>
              About Doctor
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed flex-1">
              {profile.bio_summary || 'Dr. Avik Das is a dedicated healthcare professional committed to providing accurate diagnoses, evidence-based treatments, and compassionate patient-centered care.'}
            </p>
          </div>

          {/* Clinical Expertise Card */}
          <div className="bg-[#111827] rounded-3xl p-6 shadow-lg border border-slate-800/80 hover:border-[#00C8E1]/40 transition duration-300">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-[#00C8E1]"></span>
              Clinical Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.expertise_tags && profile.expertise_tags.length > 0 ? (
                profile.expertise_tags.map((tag, index) => (
                  <span key={index} className="bg-slate-800/80 border border-slate-700/50 text-slate-300 text-xs px-3 py-1.5 rounded-full hover:border-[#00C8E1] hover:text-[#00C8E1] transition">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-sm">General Medicine, Diabetology</span>
              )}
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="bg-[#111827] rounded-3xl p-6 shadow-lg border border-slate-800/80 hover:border-[#00C8E1]/40 transition duration-300">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-[#00C8E1]"></span>
              Qualifications
            </h2>
            <div className="space-y-3">
              <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-sm">
                <span className="font-semibold text-white block">{profile.degrees}</span>
                <span className="text-slate-400 text-xs">Verified Credentials</span>
              </div>
            </div>
          </div>

        </div>

        {/* ==========================================
            ক্লিনিক লোকেশন এবং শিডিউল (Chamber Cards)
            ========================================== */}
        <div id="chambers" className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 px-1">
            Clinic Locations & Schedule
          </h2>
          
          {(!profile.chamber_schedules || profile.chamber_schedules.length === 0) ? (
             <div className="bg-[#111827] rounded-2xl p-8 text-center border border-slate-800 text-slate-400">
               No clinic schedule has been updated yet.
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.chamber_schedules.map((chamber, index) => (
                <div key={index} className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-lg hover:border-[#00C8E1]/50 transition-all duration-300 group">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#00C8E1]/10 border border-[#00C8E1]/20 flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-[#00C8E1]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base group-hover:text-[#00C8E1] transition-colors">{chamber.clinic_name}</h3>
                        <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{chamber.address}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-600 group-hover:text-[#00C8E1] transition-colors mt-1" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-slate-900/60 rounded-2xl p-3.5 mb-5 border border-slate-800/80">
                    <div>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Visiting Days</p>
                      <p className="text-slate-200 text-xs font-semibold">{chamber.visiting_days}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Timing</p>
                      <p className="text-slate-200 text-xs font-semibold">{chamber.visiting_time}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a 
                      href={`tel:${chamber.appointment_phone}`}
                      className="flex-1 flex justify-center items-center gap-2 bg-slate-800/80 text-white border border-slate-700/60 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-700 transition"
                    >
                      <Phone size={14} /> Call Clinic
                    </a>
                    <a 
                      href={chamber.map_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex justify-center items-center gap-2 bg-[#00C8E1]/10 text-[#00C8E1] border border-[#00C8E1]/20 py-2.5 rounded-xl text-xs font-bold hover:bg-[#00C8E1]/20 transition"
                    >
                      <MapPin size={14} /> Direction
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}