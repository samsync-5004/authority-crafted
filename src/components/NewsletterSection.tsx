import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z.string().trim().email("Please enter a valid email address").max(255);

const NewsletterSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase
        .from("newsletter_subscriptions")
        .insert({ email: result.data });

      if (dbError) {
        if (dbError.code === "23505") {
          setError("You're already subscribed!");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section ref={ref} className="section-padding skeuo-surface-dark text-primary-foreground">
      <div className="section-container max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary-foreground/50 mb-4">
            Stay Informed
          </p>
          <h2 className="heading-section text-primary-foreground mb-4">
            Get Strategic
            <br />
            <span className="italic font-normal">Insights Delivered</span>
          </h2>
          <p className="text-primary-foreground/60 text-lg mb-8 max-w-lg mx-auto">
            Join industry leaders who receive our weekly insights on PR, brand strategy, and digital authority.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="skeuo-card bg-primary/20 border-primary/30 p-6 inline-block"
            >
              <p className="text-primary-foreground font-semibold">You're in! 🎉</p>
              <p className="text-primary-foreground/60 text-sm mt-1">
                Watch your inbox for our next insight.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="skeuo-input w-full !bg-[hsl(214_87%_18%)] !text-primary-foreground !border-[hsl(214_60%_30%)] placeholder:!text-primary-foreground/40"
                />
                {error && (
                  <p className="text-destructive text-xs mt-1.5 text-left">{error}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="skeuo-btn-light px-6 py-3 whitespace-nowrap disabled:opacity-60"
              >
                {loading ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}

          <p className="text-primary-foreground/30 text-xs mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
