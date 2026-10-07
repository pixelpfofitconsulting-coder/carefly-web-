import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { 
  MapPin, Clock, Phone, Share2, 
  ShieldCheck, ChevronRight, Award, 
  Languages, Globe, CalendarDays
} from 'lucide-react';
import { 
  FaFacebook, FaTwitter, FaInstagram, 
  FaYoutube, FaLinkedin 
} from 'react-icons/fa';
import CareFlyLogo from '../components/careflylogo';

// ==========================================
// ১. ডেটাবেস কানেকশন (SSR)
// ==========================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================
// ২. ইন্টারফেস (Advanced Type Safety with Nested JSON)
// ==========================================
interface TimeSlot {
  days: string[];
  start_time: string;
  end_time: string;
}

interface Chamber {
  chamber_name: string;
  address: string;
  phone: string;
  slots?: TimeSlot[]; // New Nested Slots from Flutter
  // Legacy fields (For backward compatibility)
  day?: string;
  start_time?: string;
  end_time?: string;
}

interface AwardType {
  title: string;
  year: string;
}

interface SocialLinkType {
  platform: string;
  url: string;
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
  chamber_schedules: Chamber[] | null; // Nested Array format
  awards_and_recognitions: AwardType[] | null;
  social_links: SocialLinkType[] | null;
  seo_description: string | null;
  is_active: boolean;
}

// ==========================================
// ৩. এসইও মেটাডেটা (Dynamic SEO with DB Fallback)
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ subdomain: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const { data } = await supabase
    .from('doctor_portfolios_care')
    .select('doctor_name, specialty, seo_description')
    .eq('subdomain_slug', resolvedParams.subdomain)
    .eq('is_active', true)
    .single();

  if (!data) return { title: 'Doctor Not Found | CareFly' };

  return {
    title: `${data.doctor_name} - ${data.specialty} | CareFly`,
    description: data.seo_description || `Book an appointment with ${data.doctor_name}, top ${data.specialty} on CareFly.`,
  };
}

// সোশ্যাল মিডিয়া আইকন ম্যাপার লজিক
const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('facebook')) return <FaFacebook size={18} />;
  if (p.includes('linkedin')) return <FaLinkedin size={18} />;
  if (p.includes('twitter') || p.includes('x')) return <FaTwitter size={18} />;
  if (p.includes('instagram')) return <FaInstagram size={18} />;
  if (p.includes('youtube')) return <FaYoutube size={18} />;
  return <Globe size={18} />;
};

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
      
      {/* নেভিগেশন বার */}
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
            প্রিমিয়াম হিরো সেকশন
            ========================================== */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00C8E1]/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative shrink-0">
            <img 
              src={profile.profile_image_url || 'https://via.placeholder.com/300'} 
              alt={profile.doctor_name}
              className="w-40 h-40 sm:w-52 sm:h-52 rounded-2xl object-cover shadow-xl border-2 border-slate-700 bg-white/5"
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

            {/* ডায়নামিক সোশ্যাল লিংকস (Hero Section) */}
            {profile.social_links && profile.social_links.length > 0 && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                {profile.social_links.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.url.startsWith('http') ? social.url : `https://${social.url}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-800/80 rounded-full text-slate-300 hover:text-[#00C8E1] hover:bg-slate-700 border border-slate-700/60 transition shadow-lg"
                    title={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}

            <a 
              href="#chambers"
              className="inline-block bg-gradient-to-r from-[#00C8E1] to-cyan-500 hover:from-cyan-400 hover:to-cyan-600 text-slate-950 px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-[#00C8E1]/20 transition-all hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto text-center"
            >
              Book Appointment on CareFly
            </a>
          </div>
        </div>

        {/* ==========================================
            বেন্টো গ্রিড (About, Expertise, Languages, Awards)
            (Qualifications Removed for Better UX)
            ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* About Card */}
          <div className="bg-[#111827] rounded-3xl p-6 shadow-lg border border-slate-800/80 md:col-span-2 flex flex-col hover:border-[#00C8E1]/40 transition duration-300">
            <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-[#00C8E1]"></span>
              About Doctor
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed flex-1 whitespace-pre-wrap">
              {profile.bio_summary || 'Detailed professional summary is not available at the moment.'}
            </p>
          </div>

          {/* Languages Spoken */}
          <div className="bg-[#111827] rounded-3xl p-6 shadow-lg border border-slate-800/80 hover:border-[#00C8E1]/40 transition duration-300">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-orange-500"></span>
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.languages_spoken && profile.languages_spoken.length > 0 ? (
                profile.languages_spoken.map((lang, index) => (
                  <span key={index} className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/50 text-slate-300 text-xs px-3 py-1.5 rounded-full">
                    <Languages size={12} className="text-orange-400" /> {lang}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-sm">Not specified</span>
              )}
            </div>
          </div>

          {/* Clinical Expertise Card */}
          <div className="bg-[#111827] rounded-3xl p-6 shadow-lg border border-slate-800/80 md:col-span-2 hover:border-[#00C8E1]/40 transition duration-300">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-[#00C8E1]"></span>
              Clinical Expertise & Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.expertise_tags && profile.expertise_tags.length > 0 ? (
                profile.expertise_tags.map((tag, index) => (
                  <span key={index} className="bg-slate-800/80 border border-slate-700/50 text-[#00C8E1] text-xs px-3 py-1.5 rounded-md hover:border-[#00C8E1] transition">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-sm">General consultations</span>
              )}
            </div>
          </div>

          {/* Awards & Recognitions */}
          <div className="bg-[#111827] rounded-3xl p-6 shadow-lg border border-slate-800/80 hover:border-[#00C8E1]/40 transition duration-300">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-purple-500"></span>
              Awards
            </h2>
            <div className="space-y-3">
              {profile.awards_and_recognitions && profile.awards_and_recognitions.length > 0 ? (
                profile.awards_and_recognitions.map((award, index) => (
                  <div key={index} className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-sm flex items-start gap-2">
                    <Award size={16} className="text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">{award.title}</span>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">{award.year}</span>
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-slate-500 text-sm">No awards listed yet.</span>
              )}
            </div>
          </div>

        </div>

        {/* ==========================================
            ক্লিনিক লোকেশন এবং মাল্টিপল শিডিউল (Zero Loophole Mapping)
            ========================================== */}
        <div id="chambers" className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 px-1">
            Clinic Locations & Schedules
          </h2>
          
          {(!profile.chamber_schedules || profile.chamber_schedules.length === 0) ? (
             <div className="bg-[#111827] rounded-2xl p-8 text-center border border-slate-800 text-slate-400">
               No clinic schedule has been updated yet.
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profile.chamber_schedules.map((chamber, index) => {
                
                // Fallbacks & Map Link
                const clinicName = chamber.chamber_name || 'CareFly Clinic';
                const address = chamber.address || 'Address not provided';
                const phone = chamber.phone || '';
                const dynamicMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || clinicName)}`;
                
                // Nested Logic Check
                const hasNestedSlots = chamber.slots && chamber.slots.length > 0;

                return (
                  <div key={index} className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-lg hover:border-[#00C8E1]/50 transition-all duration-300 flex flex-col h-full group">
                    
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-[#00C8E1]/10 border border-[#00C8E1]/20 flex items-center justify-center shrink-0">
                          <MapPin size={22} className="text-[#00C8E1]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base group-hover:text-[#00C8E1] transition-colors">{clinicName}</h3>
                          <p className="text-slate-400 text-xs mt-1 line-clamp-2">{address}</p>
                        </div>
                      </div>
                    </div>

                    {/* টাইম স্লট রেন্ডারিং (ডাইনামিক লুপ) */}
                    <div className="flex-1">
                      {hasNestedSlots ? (
                        <div className="space-y-2 mb-5">
                          {chamber.slots!.map((slot, sIdx) => (
                            <div key={sIdx} className="grid grid-cols-2 gap-3 bg-slate-900/70 rounded-xl p-3 border border-slate-800/80 items-center">
                              <div>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                   <CalendarDays size={10} /> Days
                                </p>
                                <p className="text-slate-200 text-xs font-semibold leading-relaxed">
                                  {slot.days && slot.days.length > 0 
                                    ? slot.days.map(d => d.substring(0, 3)).join(', ') // converts "Monday" to "Mon"
                                    : 'N/A'}
                                </p>
                              </div>
                              <div>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                  <Clock size={10} /> Timing
                                </p>
                                <p className="text-slate-200 text-xs font-semibold">
                                  {slot.start_time !== 'Select' ? `${slot.start_time} - ${slot.end_time}` : 'Contact for timing'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // লেগাসি সাপোর্ট (পুরনো ফ্ল্যাট ডেটার জন্য)
                        <div className="grid grid-cols-2 gap-3 bg-slate-900/70 rounded-xl p-3.5 mb-5 border border-slate-800/80">
                          <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                               <CalendarDays size={10} /> Day
                            </p>
                            <p className="text-slate-200 text-xs font-semibold">{chamber.day || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                              <Clock size={10} /> Timing
                            </p>
                            <p className="text-slate-200 text-xs font-semibold">
                              {chamber.start_time && chamber.start_time !== 'Select' ? `${chamber.start_time} - ${chamber.end_time}` : 'Contact for timing'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* অ্যাকশন বাটনস */}
                    <div className="flex gap-3 mt-auto">
                      {phone ? (
                        <a 
                          href={`tel:${phone}`}
                          className="flex-1 flex justify-center items-center gap-2 bg-slate-800/80 text-white border border-slate-700/60 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-700 transition"
                        >
                          <Phone size={14} /> Call Clinic
                        </a>
                      ) : (
                        <div className="flex-1 flex justify-center items-center gap-2 bg-slate-800/40 text-slate-500 border border-slate-700/40 py-2.5 rounded-xl text-xs font-bold cursor-not-allowed">
                          <Phone size={14} /> No Number
                        </div>
                      )}
                      
                      <a 
                        href={dynamicMapLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex justify-center items-center gap-2 bg-[#00C8E1]/10 text-[#00C8E1] border border-[#00C8E1]/20 py-2.5 rounded-xl text-xs font-bold hover:bg-[#00C8E1]/20 transition"
                      >
                        <MapPin size={14} /> Direction
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}