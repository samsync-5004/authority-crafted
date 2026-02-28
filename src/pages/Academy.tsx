import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Academy = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-foreground text-primary-foreground">
      <div className="section-container text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary-foreground/50 mb-4">
            Coming Soon
          </p>
          <h1 className="heading-display text-primary-foreground mb-6">
            ID8TORS
            <br />
            <span className="italic font-normal">Academy</span>
          </h1>
          <p className="text-primary-foreground/60 text-lg mb-10">
            Learn PR, digital marketing, and brand strategy from practitioners who've done it at scale. Courses launching soon.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 border border-primary-foreground/30 text-primary-foreground font-body text-sm font-semibold tracking-wide uppercase hover:bg-primary-foreground hover:text-foreground transition-all duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Academy;
