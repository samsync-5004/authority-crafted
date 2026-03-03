import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="skeuo-surface-dark text-primary-foreground section-padding" ref={ref}>
      <div className="section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-primary-foreground max-w-3xl mx-auto mb-6">
            Ready to become
            <br />
            <span className="italic font-normal">undeniable?</span>
          </h2>
          <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto mb-10">
            Let's build a strategy that makes your competitors nervous and your audience loyal.
          </p>
          {/* Skeuomorphic glossy white CTA */}
          <Link
            to="/book-strategy-call"
            className="skeuo-btn-light px-10 py-4"
          >
            Book Your Strategy Call
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
