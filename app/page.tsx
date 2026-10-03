import WaitlistCountProvider from "@/components/common/WaitlistCountProvider";
import FaqSection from "@/components/home/FaqSection";
import FeatureStrip from "@/components/home/FeatureStrip";
import FinalCTASection from "@/components/home/FinalCTASection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ProblemSolutionSection from "@/components/home/ProblemSolutionSection";
import SafetySection from "@/components/home/SafetySection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getHomeContent } from "@/controllers/home.controller";
import { getWaitlistCount } from "@/controllers/waitlist.controller";

// Re-fetch Supabase content and the waitlist count at most once a minute.
export const revalidate = 60;

export default async function HomePage() {
  const [content, waitlistCount] = await Promise.all([getHomeContent(), getWaitlistCount()]);

  return (
    <WaitlistCountProvider initialCount={waitlistCount}>
      <Header />
      <main className="flex-1">
        <HeroSection content={content.hero} socialProof={content.socialProof} />
        <FeatureStrip />
        <ProblemSolutionSection problem={content.problem} solution={content.solution} />
        <HowItWorksSection content={content.howItWorks} />
        <SafetySection content={content.safety} />
        <FaqSection items={content.faq} />
        <FinalCTASection content={content.cta} />
      </main>
      <Footer />
    </WaitlistCountProvider>
  );
}
