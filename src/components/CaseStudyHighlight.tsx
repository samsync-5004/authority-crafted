import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const CaseStudyHighlight = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary" ref={ref}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Featured Case Study
            </p>
            <h2 className="heading-section text-foreground mb-6">
              How we turned a stealth brand into a
              <span className="italic font-normal"> market leader</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              In 90 days, we repositioned a fintech startup from unknown challenger to the most talked-about brand in West African digital payments — generating 340% increase in media mentions and 12,000+ qualified leads.
            </p>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-3 text-sm font-medium text-primary uppercase tracking-wide hover:gap-5 transition-all duration-300"
            >
              Read Full Study <span className="text-lg">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-foreground/5 aspect-[4/3] flex items-center justify-center"
          >
            <div className="text-center p-8">
              <span className="font-display text-6xl md:text-7xl font-bold text-primary">340%</span>
              <p className="mt-2 text-sm text-muted-foreground tracking-wide uppercase">
                Increase in Media Mentions
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHighlight;
