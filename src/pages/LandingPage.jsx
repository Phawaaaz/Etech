import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LogoCloud from "@/components/landing/LogoCloud";
import StatsBand from "@/components/landing/StatsBand";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesSection from "@/components/landing/FeatureSection";
import ShowcaseSection from "@/components/landing/ShowcaseSection";
import Testimonials from "@/components/landing/Testimonials";
// import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/layout/Footer";

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
        {/* <Pricing /> */}
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
