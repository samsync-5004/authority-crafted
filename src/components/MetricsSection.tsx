import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { value: "150+", label: "Brands Elevated" },
  { value: "98%", label: "Client Retention" },
  { value: "₦2B+", label: "Revenue Generated" },
  { value: "8", label: "Industry Awards" },
];

const MetricsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-foreground text-primary-foreground section-padding" ref={ref}>
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
                {m.value}
              </span>
              <p className="mt-2 text-sm text-primary-foreground/50 tracking-wide uppercase">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
