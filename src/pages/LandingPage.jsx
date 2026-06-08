import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-purple-600 selection:text-white">
      <Navbar />
      <HeroSection />
    </div>
  );
}
