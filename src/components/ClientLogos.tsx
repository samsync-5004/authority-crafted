import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const logos = [
  "TechCorp", "Meridian", "Vanguard", "Helix", "Pinnacle",
  "Nexus", "Catalyst", "Elevation",
];

const ClientLogos = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 bg-background border-y border-border" ref={ref}>
      <div className="section-container">
        <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-muted-foreground text-center mb-10">
          Trusted by Leading Brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {logos.map((logo, i) => (
            <motion.span
              key={logo}
              className="font-display text-lg md:text-xl font-semibold text-muted-foreground/40 tracking-wider"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
