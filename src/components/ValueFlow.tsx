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

// Build a zigzag SVG path with sharp angular corners
const SVG_WIDTH = 100;
const SVG_HEIGHT = 1000;
const buildAngularPath = () => {
  const segmentH = SVG_HEIGHT / steps.length;
  const cx = SVG_WIDTH / 2;
  const offsetX = 30; // horizontal zigzag offset
  let d = `M ${cx} 0`;
  for (let i = 0; i < steps.length; i++) {
    const yStart = i * segmentH;
    const yMid = yStart + segmentH * 0.35;
    const yMid2 = yStart + segmentH * 0.65;
    const yEnd = yStart + segmentH;
    const dir = i % 2 === 0 ? 1 : -1;
    d += ` L ${cx + offsetX * dir} ${yMid}`;
    d += ` L ${cx - offsetX * dir} ${yMid2}`;
    d += ` L ${cx} ${yEnd}`;
  }
  return d;
};

const ANGULAR_PATH = buildAngularPath();

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
        className="w-3 h-3 rounded-full bg-primary mb-8 relative z-10"
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
        className="skeuo-btn px-6 py-3 rounded-full hover:scale-[1.03]"
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

  // 3D perspective transforms driven by scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [8, -3, 4, -2, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-6, 4, -4, 3, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-40, 20, 0]);
  const lineDrawProgress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <section className="section-padding skeuo-surface-light" ref={containerRef}>
      <div className="section-container">
        <div className="text-center mb-8">
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our Process
          </p>
          <h2 className="heading-section text-foreground">
            Connected <span className="italic font-normal">Value</span>
          </h2>
        </div>

        <div className="relative" style={{ perspective: "800px" }}>
          {/* SVG angular line — desktop */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none"
            style={{
              width: `${SVG_WIDTH}px`,
              marginLeft: `-${SVG_WIDTH / 2}px`,
              left: "50%",
              transformStyle: "preserve-3d",
              rotateX,
              rotateY,
              translateZ,
            }}
          >
            <svg
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Background track */}
              <path
                d={ANGULAR_PATH}
                stroke="hsl(214 20% 30% / 0.15)"
                strokeWidth="1"
                fill="none"
              />
              {/* Animated draw-on path */}
              <motion.path
                d={ANGULAR_PATH}
                stroke="hsl(214 70% 42%)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                style={{
                  pathLength: lineDrawProgress,
                  filter: "drop-shadow(0 0 6px hsl(214 87% 50% / 0.4))",
                }}
              />
            </svg>
          </motion.div>

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
