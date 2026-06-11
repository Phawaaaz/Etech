import CTASection from "../components/CTASection";
import FeaturesSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import InteractiveWidget from "../components/InteractiveWidget";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div className="text-white font-sans text-white">
      <Navbar />
      <HeroSection />
      <InteractiveWidget />
      <HowItWorks />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
