import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "STRATEGY",
    description: "We engineer positioning before campaigns begin.",
    cta: "Explore Strategy",
    path: "/services/pr-strategy",
  },
  {
    title: "STORYTELLING",
    description: "We craft narratives that make your brand unforgettable.",
    cta: "Explore Storytelling",
    path: "/services/brand-storytelling",
  },
  {
    title: "EXECUTION",
    description: "We deploy campaigns with surgical precision across every channel.",
    cta: "Explore Execution",
    path: "/services/digital-marketing",
  },
  {
    title: "RESULTS",
    description: "We measure everything. Vanity metrics don't live here.",
    cta: "View Case Studies",
    path: "/case-studies",
  },
];

const StepItem = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center py-16 md:py-24"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {/* Node dot */}
      <motion.div
        className="w-3 h-3 rounded-full bg-primary mb-8 relative"
        animate={inView ? { boxShadow: "0 0 20px 4px hsl(214 87% 30% / 0.4)" } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      <span className="text-xs font-body text-muted-foreground tracking-widest mb-4">
        0{index + 1}
      </span>
      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
        {step.title}
      </h3>
      <p className="text-muted-foreground text-lg max-w-md mb-8 italic">
        {step.description}
      </p>
      <Link
        to={step.path}
        className="inline-flex items-center gap-3 px-6 py-3 border border-primary text-primary text-sm font-medium tracking-wide uppercase rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 min-h-[48px]"
      >
        <span>→</span>
        {step.cta}
      </Link>
    </motion.div>
  );
};

const ValueFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section className="section-padding bg-background" ref={containerRef}>
      <div className="section-container">
        <div className="text-center mb-8">
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our Process
          </p>
          <h2 className="heading-section text-foreground">
            Connected <span className="italic font-normal">Value</span>
          </h2>
        </div>

        <div className="relative">
          {/* Animated vertical line - desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile static divider */}
          <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border" />

          {steps.map((step, i) => (
            <StepItem key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueFlow;
