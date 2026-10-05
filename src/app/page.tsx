import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Ecosystem from "./components/ecosystem";
import BentoFeatures from "./components/bentofeatures";
import EmergencyNetwork from "./components/emergencynetwork";
import EcosystemBenefits from "./components/echosystembenefits";
import Footer from "./components/footer";
import MissionVision from './components/missionvision';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#010c0c] relative selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      
      {/* 1. Header */}
      <Navbar />
      
      {/* 2. Hero Section (Intelligence in Motion) */}
      <Hero />

      {/* 3. প্রথম ইকোসিস্টেম (সোলার সিস্টেম ডায়াগ্রাম) */}
      <div id="platform" className="relative z-10">
        <Ecosystem />
      </div>

      {/* 3.1 Mission & Vision Section */}
        <MissionVision />

      {/* 4. মাঝখানের গ্যাপ ১: বেন্টো ফিচারস */}
      <BentoFeatures />
      
      {/* 5. মাঝখানের গ্যাপ ২: ইমার্জেন্সি নেটওয়ার্ক */}
      <EmergencyNetwork />
      
      {/* 6. দ্বিতীয় ইকোসিস্টেম (বেনিফিটস / ট্যাব সিস্টেম - সবার শেষে) */}
      <EcosystemBenefits />
      {/* 7. Premium Footer */}
      <Footer />

    </main>
  );
}