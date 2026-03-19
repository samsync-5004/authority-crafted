import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADER_DURATION_MS = 7000; // 7 seconds total
const TICK_MS = 70; // slower ticks = longer loader

const Loader3D = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const increment = 100 / (LOADER_DURATION_MS / TICK_MS);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start exit sequence
          setExiting(true);
          setTimeout(onComplete, 1200); // long fade-out
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(180deg, hsl(214 90% 8%) 0%, hsl(214 87% 14%) 100%)",
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 3D rotating cube */}
          <div className="perspective-[600px] mb-12">
            <motion.div
              className="w-16 h-16 relative"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateX: 360, rotateY: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 border-2 border-white/30"
                style={{
                  transform: "translateZ(32px)",
                  background: "linear-gradient(135deg, hsl(214 70% 42% / 0.8), hsl(214 87% 30% / 0.6))",
                  boxShadow: "0 0 20px hsl(214 87% 50% / 0.3)",
                }}
              />
              {/* Back */}
              <div
                className="absolute inset-0 border-2 border-white/20"
                style={{
                  transform: "rotateY(180deg) translateZ(32px)",
                  background: "linear-gradient(135deg, hsl(214 87% 30% / 0.6), hsl(214 90% 24% / 0.4))",
                }}
              />
              {/* Right */}
              <div
                className="absolute inset-0 border-2 border-white/20"
                style={{
                  transform: "rotateY(90deg) translateZ(32px)",
                  background: "linear-gradient(135deg, hsl(214 60% 50% / 0.5), hsl(214 87% 30% / 0.5))",
                }}
              />
              {/* Left */}
              <div
                className="absolute inset-0 border-2 border-white/20"
                style={{
                  transform: "rotateY(-90deg) translateZ(32px)",
                  background: "linear-gradient(135deg, hsl(214 87% 30% / 0.5), hsl(214 60% 50% / 0.5))",
                }}
              />
              {/* Top */}
              <div
                className="absolute inset-0 border-2 border-white/30"
                style={{
                  transform: "rotateX(90deg) translateZ(32px)",
                  background: "linear-gradient(135deg, hsl(214 70% 42% / 0.7), hsl(214 60% 50% / 0.5))",
                }}
              />
              {/* Bottom */}
              <div
                className="absolute inset-0 border-2 border-white/15"
                style={{
                  transform: "rotateX(-90deg) translateZ(32px)",
                  background: "linear-gradient(135deg, hsl(214 90% 24% / 0.6), hsl(214 87% 14% / 0.4))",
                }}
              />
            </motion.div>
          </div>

          {/* Brand name with stagger */}
          <motion.p
            className="font-display text-2xl font-bold tracking-wider text-primary-foreground/90 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ID8TORS
          </motion.p>

          {/* Status text that changes */}
          <motion.p
            className="text-xs font-body tracking-[0.2em] uppercase text-primary-foreground/40 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {progress < 30 ? "Initializing" : progress < 60 ? "Loading assets" : progress < 90 ? "Preparing experience" : "Ready"}
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(214 70% 42%), hsl(214 60% 60%))",
                width: `${progress}%`,
              }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            className="text-xs font-body text-primary-foreground/30 mt-3 tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      ) : (
        <motion.div
          key="loader-exit"
          className="fixed inset-0 z-[9999]"
          style={{
            background: "linear-gradient(180deg, hsl(214 90% 8%) 0%, hsl(214 87% 14%) 100%)",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </AnimatePresence>
  );
};

export default Loader3D;
