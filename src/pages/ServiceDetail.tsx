import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import CTASection from "@/components/CTASection";

const serviceData: Record<string, {
  title: string; tagline: string; overview: string;
  problem: string; approach: string; steps: string[];
}> = {
  "pr-strategy": {
    title: "PR Strategy",
    tagline: "Control the narrative before anyone else can.",
    overview: "Our PR strategy practice delivers media relations, crisis communications, and reputation management frameworks that position our clients as the definitive voices in their industries.",
    problem: "Most brands react to media cycles instead of engineering them. Without strategic media positioning, even the best companies remain invisible to the audiences that matter most.",
    approach: "We build proactive media strategies that place our clients at the center of industry conversations. Our approach combines deep journalist relationships, data-driven media targeting, and narrative architecture.",
    steps: ["Audit & Research", "Narrative Architecture", "Media Mapping", "Campaign Execution", "Measurement & Optimization"],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    tagline: "Performance-driven. Results-obsessed.",
    overview: "Full-funnel digital campaigns across search, social, and programmatic channels that convert attention into measurable revenue growth.",
    problem: "Brands waste millions on unfocused digital spend — scattering budgets across channels without a unified conversion strategy. The result: impressions without impact.",
    approach: "We architect digital campaigns from conversion backward. Every channel, every creative, every bid is engineered to drive specific business outcomes.",
    steps: ["Audience Intelligence", "Channel Strategy", "Creative Development", "Campaign Launch", "Performance Optimization"],
  },
  "brand-storytelling": {
    title: "Brand Storytelling",
    tagline: "Your brand is a story. We make it legendary.",
    overview: "Narrative architecture that transforms your brand from a market participant into a cultural reference point — the name people think of first.",
    problem: "In crowded markets, features don't differentiate. Brands that fail to build emotional connection become commodities competing only on price.",
    approach: "We uncover the authentic narrative at the heart of your brand and amplify it across every touchpoint — from visual identity to content strategy to cultural moment marketing.",
    steps: ["Brand Discovery", "Narrative Framework", "Identity Design", "Content Strategy", "Cultural Activation"],
  },
  "talent-management": {
    title: "Talent Management",
    tagline: "Build the person. The brand follows.",
    overview: "Strategic positioning and brand building for executives, creators, and public figures who demand authority — not just visibility.",
    problem: "Personal brands built on vanity metrics collapse under scrutiny. Without strategic positioning, even the most talented individuals remain undervalued.",
    approach: "We build personal brands from the inside out — defining positioning, crafting narrative, and engineering the visibility that creates lasting authority.",
    steps: ["Positioning Audit", "Brand Architecture", "Media Training", "Visibility Engineering", "Partnership Strategy"],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  if (!service) {
    return (
      <div className="pt-32 section-container text-center">
        <h1 className="heading-section text-foreground">Service not found</h1>
        <Link to="/services" className="text-primary mt-4 inline-block">← Back to Services</Link>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-20 skeuo-surface-dark text-primary-foreground">
        <div className="section-container">
          <Link to="/services" className="text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors mb-6 inline-block">
            ← All Services
          </Link>
          <motion.h1
            className="heading-display text-primary-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {service.title}
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-primary-foreground/60 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {service.tagline}
          </motion.p>
        </div>
      </section>

      <section className="section-padding skeuo-surface-light">
        <div className="section-container max-w-3xl space-y-16">
          <div>
            <h2 className="heading-sub text-foreground mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{service.overview}</p>
          </div>
          <div>
            <h2 className="heading-sub text-foreground mb-4">The Problem</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{service.problem}</p>
          </div>
          <div>
            <h2 className="heading-sub text-foreground mb-4">Our Approach</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{service.approach}</p>
          </div>
          <div>
            <h2 className="heading-sub text-foreground mb-6">Execution Steps</h2>
            <div className="space-y-4">
              {service.steps.map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  {/* Skeuomorphic step number badge */}
                  <span className="skeuo-btn w-8 h-8 !min-h-0 flex items-center justify-center text-sm font-semibold flex-shrink-0 !px-0 !py-0">
                    {i + 1}
                  </span>
                  <span className="text-foreground font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default ServiceDetail;
