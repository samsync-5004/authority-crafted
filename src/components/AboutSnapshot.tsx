import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const AboutSnapshot = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Who We Are
            </p>
            <h2 className="heading-section text-foreground mb-6">
              8 creatives who chose
              <span className="italic font-normal"> precision over noise</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded by eight multidisciplinary creatives, ID8TORS was born from a shared conviction: the African market deserves world-class communications infrastructure.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From Lagos to Accra, we're building the agency that doesn't just follow global standards — we set them.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-sm font-medium text-primary uppercase tracking-wide hover:gap-5 transition-all duration-300"
            >
              Our Story <span className="text-lg">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="skeuo-card overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="ID8TORS creative team collaborating in a modern workspace"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-6 -left-4 skeuo-card p-5 bg-card">
              <span className="font-display text-3xl font-bold text-primary">8</span>
              <p className="text-xs text-muted-foreground tracking-wide uppercase mt-1">
                Founding Creatives
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
