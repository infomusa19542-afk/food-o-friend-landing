import FeatureStrip from "@/components/home/FeatureStrip";
import FinalCTASection from "@/components/home/FinalCTASection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ProblemSolutionSection from "@/components/home/ProblemSolutionSection";
import SafetySection from "@/components/home/SafetySection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AppStrings } from "@/constants/app_strings";
import { getFallbackHomeContent } from "@/controllers/home.controller";

export default function HomePage() {
  const content = getFallbackHomeContent();

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection
          content={content.hero}
          socialProof={content.socialProof}
          waitlistCount={AppStrings.socialProof.placeholderCount}
        />
        <FeatureStrip />
        <ProblemSolutionSection problem={content.problem} solution={content.solution} />
        <HowItWorksSection content={content.howItWorks} />
        <SafetySection content={content.safety} />
        <FinalCTASection content={content.cta} />
      </main>
      <Footer />
    </>
  );
}
