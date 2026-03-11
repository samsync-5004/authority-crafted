import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader3D = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(180deg, hsl(214 90% 8%) 0%, hsl(214 87% 14%) 100%)",
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* 3D rotating cube */}
        <div className="perspective-[600px] mb-12">
          <motion.div
            className="w-16 h-16 relative"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: 360, rotateY: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 border-2 border-white/30"
              style={{
                transform: "translateZ(32px)",
                background: "linear-gradient(135deg, hsl(214 70% 42% / 0.8), hsl(214 87% 30% / 0.6))",
                boxShadow: "0 0 20px hsl(214 87% 50% / 0.3)",
              }}
            />
            {/* Back face */}
            <div
              className="absolute inset-0 border-2 border-white/20"
              style={{
                transform: "rotateY(180deg) translateZ(32px)",
                background: "linear-gradient(135deg, hsl(214 87% 30% / 0.6), hsl(214 90% 24% / 0.4))",
              }}
            />
            {/* Right face */}
            <div
              className="absolute inset-0 border-2 border-white/20"
              style={{
                transform: "rotateY(90deg) translateZ(32px)",
                background: "linear-gradient(135deg, hsl(214 60% 50% / 0.5), hsl(214 87% 30% / 0.5))",
              }}
            />
            {/* Left face */}
            <div
              className="absolute inset-0 border-2 border-white/20"
              style={{
                transform: "rotateY(-90deg) translateZ(32px)",
                background: "linear-gradient(135deg, hsl(214 87% 30% / 0.5), hsl(214 60% 50% / 0.5))",
              }}
            />
            {/* Top face */}
            <div
              className="absolute inset-0 border-2 border-white/30"
              style={{
                transform: "rotateX(90deg) translateZ(32px)",
                background: "linear-gradient(135deg, hsl(214 70% 42% / 0.7), hsl(214 60% 50% / 0.5))",
              }}
            />
            {/* Bottom face */}
            <div
              className="absolute inset-0 border-2 border-white/15"
              style={{
                transform: "rotateX(-90deg) translateZ(32px)",
                background: "linear-gradient(135deg, hsl(214 90% 24% / 0.6), hsl(214 87% 14% / 0.4))",
              }}
            />
          </motion.div>
        </div>

        {/* Brand name */}
        <motion.p
          className="font-display text-2xl font-bold tracking-wider text-primary-foreground/90 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ID8TORS
        </motion.p>

        {/* Progress bar */}
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(214 70% 42%), hsl(214 60% 60%))",
              width: `${progress}%`,
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader3D;
