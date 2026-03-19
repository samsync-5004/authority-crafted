import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const HERO_VIDEO = "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4";
const HERO_POSTER = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80";

/* ── Animation presets for H1 cycling ── */
const animationStyles = [
  // 0: Glitch
  {
    name: "glitch",
    style: (i: number) => ({
      initial: { opacity: 0, x: i % 2 === 0 ? -4 : 4, skewX: -8 },
      animate: { opacity: 1, x: 0, skewX: 0 },
      transition: { duration: 0.05, delay: i * 0.02 },
    }),
  },
  // 1: Wave
  {
    name: "wave",
    style: (i: number) => ({
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  },
  // 2: Blur fade in
  {
    name: "blur",
    style: (i: number) => ({
      initial: { opacity: 0, filter: "blur(12px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      transition: { duration: 0.6, delay: i * 0.03 },
    }),
  },
  // 3: Scale pop
  {
    name: "scale",
    style: (i: number) => ({
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.35, delay: i * 0.03, type: "spring" as const, stiffness: 300 },
    }),
  },
  // 4: Slide from bottom stagger
  {
    name: "slide-up",
    style: (i: number) => ({
      initial: { y: 40, opacity: 0, rotateX: 90 },
      animate: { y: 0, opacity: 1, rotateX: 0 },
      transition: { duration: 0.5, delay: i * 0.025 },
    }),
  },
];

const CYCLE_INTERVAL = 4000;

const headingPairs = [
  { line1: "We Engineer", line2: "Digital Authority" },
  { line1: "We Build", line2: "Brand Dominance" },
  { line1: "We Craft", line2: "Cultural Impact" },
  { line1: "We Shape", line2: "Market Influence" },
  { line1: "We Drive", line2: "Strategic Growth" },
];

const CyclingH1 = () => {
  const [styleIndex, setStyleIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStyleIndex((prev) => (prev + 1) % animationStyles.length);
      setTextIndex((prev) => (prev + 1) % headingPairs.length);
      setKey((k) => k + 1);
    }, CYCLE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const { line1, line2 } = headingPairs[textIndex];
  const currentStyle = animationStyles[styleIndex];

  const chars1 = useMemo(() => line1.split(""), [line1]);
  const chars2 = useMemo(() => line2.split(""), []);

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={key}
        className="heading-display text-primary-foreground max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ perspective: "600px" }}
      >
        <span className="inline-block">
          {chars1.map((char, i) => {
            const props = currentStyle.style(i);
            return (
              <motion.span
                key={`${key}-1-${i}`}
                className="inline-block"
                initial={props.initial}
                animate={props.animate}
                transition={props.transition}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </span>
        <br />
        <span className="italic font-normal inline-block">
          {chars2.map((char, i) => {
            const offset = chars1.length;
            const props = currentStyle.style(i + offset);
            return (
              <motion.span
                key={`${key}-2-${i}`}
                className="inline-block"
                initial={props.initial}
                animate={props.animate}
                transition={props.transition}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </span>
      </motion.h1>
    </AnimatePresence>
  );
};

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <img
          src={HERO_POSTER}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          poster={HERO_POSTER}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        style={{ opacity, y }}
      >
        <motion.p
          className="text-xs md:text-sm font-body font-medium tracking-[0.3em] uppercase text-primary-foreground/60 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          PR · Digital Marketing · Brand Strategy
        </motion.p>

        <CyclingH1 />

        <motion.p
          className="mt-6 text-body-lg text-primary-foreground/70 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          ID8TORS is a premium communications firm that positions brands, leaders, and ideas at the center of culture.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Link to="/book-strategy-call" className="skeuo-btn-light px-8 py-3.5 min-w-[200px]">
            Book Strategy Call
          </Link>
          <Link to="/case-studies" className="skeuo-btn-outline px-8 py-3.5 min-w-[200px]">
            View Case Studies
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-px h-12 bg-primary-foreground/30" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
