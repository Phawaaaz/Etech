import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LogoCloud from "../components/LogoCloud";
import StatsBand from "../components/StatsBand";
import HowItWorks from "../components/HowItWorks";
import FeaturesSection from "../components/FeatureSection";
import ShowcaseSection from "../components/ShowcaseSection";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <LogoCloud />
        <StatsBand />
        <HowItWorks />
        <FeaturesSection />
        <ShowcaseSection />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
