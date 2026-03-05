import HeroSection from "@/components/HeroSection";
import CaseStudyHighlight from "@/components/CaseStudyHighlight";
import ClientLogos from "@/components/ClientLogos";
import ServicesOverview from "@/components/ServicesOverview";
import MetricsSection from "@/components/MetricsSection";
import ValueFlow from "@/components/ValueFlow";
import AboutSnapshot from "@/components/AboutSnapshot";
import NewsletterSection from "@/components/NewsletterSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <CaseStudyHighlight />
      <ClientLogos />
      <ServicesOverview />
      <MetricsSection />
      <ValueFlow />
      <AboutSnapshot />
      <NewsletterSection />
      <CTASection />
    </>
  );
};

export default Index;
