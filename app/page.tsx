import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CrisisSection from "@/components/CrisisSection";
import PlatformIntroSection from "@/components/PlatformIntroSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import SolutionsSection from "@/components/SolutionsSection";
import UseCasesSection from "@/components/UseCasesSection";
import WhyUsSection from "@/components/WhyUsSection";
import VisionSection from "@/components/VisionSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import TransformationRoadmap from "@/components/TransformationRoadmap";
import HealthcareValueChain from "@/components/HealthcareValueChain";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CrisisSection />
        <PlatformIntroSection />
        <ArchitectureSection />
        <SolutionsSection />
        <UseCasesSection />

        <HealthcareValueChain />
        <TransformationRoadmap/>
        {/* <WhyUsSection /> */}
        <VisionSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
