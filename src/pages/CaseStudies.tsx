import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CTASection from "@/components/CTASection";

const caseStudies = [
  {
    slug: "fintech-market-leader",
    client: "Leading Fintech Startup",
    title: "From stealth to market leader in 90 days",
    category: "PR Strategy",
    result: "340% increase in media mentions",
  },
  {
    slug: "fmcg-digital-transformation",
    client: "Major FMCG Brand",
    title: "Digital transformation that tripled online revenue",
    category: "Digital Marketing",
    result: "3x online revenue growth",
  },
  {
    slug: "tech-ceo-positioning",
    client: "Tech CEO",
    title: "Building Africa's most quoted tech executive",
    category: "Talent Management",
    result: "50+ media features in 6 months",
  },
];

const CaseStudies = () => {
  return (
    <>
      <section className="pt-32 pb-20 skeuo-surface-dark text-primary-foreground">
        <div className="section-container">
          <motion.p
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary-foreground/50 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Case Studies
          </motion.p>
          <motion.h1
            className="heading-display text-primary-foreground max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Results that
            <br />
            <span className="italic font-normal">speak volumes</span>
          </motion.h1>
        </div>
      </section>

      <section className="section-padding skeuo-surface-light">
        <div className="section-container space-y-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Link
                to={`/case-studies/${cs.slug}`}
                className="skeuo-card block p-10 md:p-12 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-body text-muted-foreground tracking-widest uppercase">
                      {cs.category}
                    </span>
                    <h2 className="heading-sub text-foreground mt-2 group-hover:text-primary transition-colors duration-300">
                      {cs.title}
                    </h2>
                    <p className="text-muted-foreground mt-2">{cs.client}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-primary whitespace-nowrap">
                      {cs.result}
                    </span>
                    <span className="text-xl text-primary group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default CaseStudies;
