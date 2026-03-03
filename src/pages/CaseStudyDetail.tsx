import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import CTASection from "@/components/CTASection";

const data: Record<string, {
  client: string; title: string; category: string;
  challenge: string; strategy: string; execution: string; results: string[];
}> = {
  "fintech-market-leader": {
    client: "Leading Fintech Startup",
    title: "From stealth to market leader in 90 days",
    category: "PR Strategy",
    challenge: "A well-funded fintech startup had a superior product but zero brand recognition. They were losing deals to less capable competitors who simply had louder voices in the market.",
    strategy: "We developed a multi-channel PR blitz that positioned the founders as thought leaders while simultaneously securing coverage in Tier 1 business and technology publications across West Africa.",
    execution: "Over 90 days, we secured 45+ media placements, organized 3 exclusive media roundtables, and engineered 2 viral social campaigns that generated organic conversation in the fintech community.",
    results: ["340% increase in media mentions", "12,000+ qualified leads generated", "3 major partnership deals attributed to PR", "Became the most searched fintech brand in Nigeria"],
  },
  "fmcg-digital-transformation": {
    client: "Major FMCG Brand",
    title: "Digital transformation that tripled online revenue",
    category: "Digital Marketing",
    challenge: "A legacy FMCG brand was losing market share to digitally native competitors. Their online presence was outdated, and digital contributed less than 5% of total revenue.",
    strategy: "We architected a full-funnel digital transformation — from brand repositioning to performance marketing — designed to capture the growing e-commerce opportunity in West Africa.",
    execution: "We rebuilt their digital presence, launched targeted paid campaigns across Meta and Google, implemented conversion optimization, and created a content engine that drove organic growth.",
    results: ["3x online revenue growth in 12 months", "65% reduction in customer acquisition cost", "400% increase in social engagement", "Digital now contributes 22% of total revenue"],
  },
  "tech-ceo-positioning": {
    client: "Tech CEO",
    title: "Building Africa's most quoted tech executive",
    category: "Talent Management",
    challenge: "A brilliant tech CEO was virtually unknown outside their immediate industry circle. They had valuable insights but no platform to share them and no strategy to build visibility.",
    strategy: "We developed a personal brand framework that positioned the CEO as a thought leader at the intersection of technology, entrepreneurship, and African innovation.",
    execution: "We secured speaking slots at 8 major conferences, placed 50+ media features, ghostwrote a weekly LinkedIn column that grew to 45K followers, and secured a book deal.",
    results: ["50+ media features in 6 months", "8 keynote speaking engagements", "45K LinkedIn followers (from 2K)", "Book deal secured with major publisher"],
  },
};

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = slug ? data[slug] : null;

  if (!cs) {
    return (
      <div className="pt-32 section-container text-center">
        <h1 className="heading-section text-foreground">Case study not found</h1>
        <Link to="/case-studies" className="text-primary mt-4 inline-block">← Back to Case Studies</Link>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-20 skeuo-surface-dark text-primary-foreground">
        <div className="section-container">
          <Link to="/case-studies" className="text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors mb-6 inline-block">
            ← All Case Studies
          </Link>
          <span className="block text-xs font-body text-primary-foreground/40 tracking-widest uppercase mb-4">{cs.category}</span>
          <motion.h1
            className="heading-display text-primary-foreground max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {cs.title}
          </motion.h1>
          <p className="mt-4 text-lg text-primary-foreground/60">{cs.client}</p>
        </div>
      </section>

      <section className="section-padding skeuo-surface-light">
        <div className="section-container max-w-3xl space-y-16">
          <div>
            <h2 className="heading-sub text-foreground mb-4">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{cs.challenge}</p>
          </div>
          <div>
            <h2 className="heading-sub text-foreground mb-4">Our Strategy</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{cs.strategy}</p>
          </div>
          <div>
            <h2 className="heading-sub text-foreground mb-4">Execution</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{cs.execution}</p>
          </div>
          <div>
            <h2 className="heading-sub text-foreground mb-6">Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cs.results.map((r) => (
                <div key={r} className="skeuo-card p-6">
                  <p className="font-display text-lg font-semibold text-foreground">{r}</p>
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

export default CaseStudyDetail;
