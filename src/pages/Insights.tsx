import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const posts = [
  {
    slug: "why-pr-matters-more-than-ever",
    title: "Why PR Matters More Than Ever in Africa's Digital Economy",
    excerpt: "The brands winning in Africa aren't the loudest. They're the most strategically positioned.",
    category: "PR Strategy",
    date: "February 15, 2026",
  },
  {
    slug: "personal-branding-executives",
    title: "The Executive's Guide to Personal Branding in 2026",
    excerpt: "Your personal brand is your most undervalued asset. Here's how to fix that.",
    category: "Talent",
    date: "February 8, 2026",
  },
  {
    slug: "digital-marketing-roi",
    title: "Stop Measuring Impressions. Start Measuring Impact.",
    excerpt: "Why most digital marketing metrics are vanity metrics — and what to track instead.",
    category: "Digital Marketing",
    date: "January 28, 2026",
  },
];

const Insights = () => {
  return (
    <>
      <section className="pt-32 pb-20 bg-foreground text-primary-foreground">
        <div className="section-container">
          <motion.p
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary-foreground/50 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Insights
          </motion.p>
          <motion.h1
            className="heading-display text-primary-foreground max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Thinking that
            <br />
            <span className="italic font-normal">sharpens strategy</span>
          </motion.h1>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="space-y-0 divide-y divide-border">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link to={`/insights/${post.slug}`} className="block py-12 group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs font-body text-muted-foreground tracking-widest uppercase">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground/50">{post.date}</span>
                      </div>
                      <h2 className="heading-sub text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground max-w-xl">{post.excerpt}</p>
                    </div>
                    <span className="text-xl text-primary group-hover:translate-x-2 transition-transform duration-300 mt-2 md:mt-4">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Insights;
