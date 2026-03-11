import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_VIDEO = "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4";
const HERO_POSTER = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80";

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
      {/* Background: fallback image + video overlay */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        {/* Static fallback image — always visible until video loads */}
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

      {/* Content */}
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
        <motion.h1
          className="heading-display text-primary-foreground max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          We Engineer
          <br />
          <span className="italic font-normal">Digital Authority</span>
        </motion.h1>
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

      {/* Scroll indicator */}
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
