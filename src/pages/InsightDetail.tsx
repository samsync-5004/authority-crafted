import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import CTASection from "@/components/CTASection";

const blogData: Record<string, {
  title: string; category: string; date: string; content: string[];
}> = {
  "why-pr-matters-more-than-ever": {
    title: "Why PR Matters More Than Ever in Africa's Digital Economy",
    category: "PR Strategy",
    date: "February 15, 2026",
    content: [
      "The African digital economy is growing at an unprecedented rate. With over 500 million internet users and a mobile-first population, the continent represents the world's most dynamic digital frontier.",
      "Yet most brands operating in this space are making a critical mistake: they're investing heavily in digital marketing while completely ignoring public relations. The result? Brands that can buy attention but can't earn trust.",
      "In a market where trust is the scarcest commodity, PR isn't optional — it's foundational. The brands that will win the next decade in Africa aren't the ones with the biggest ad budgets. They're the ones with the most credible narratives.",
      "Strategic PR builds the kind of authority that paid media simply cannot. When a respected journalist or publication validates your brand, it carries a weight that no amount of sponsored content can replicate.",
      "At ID8TORS, we've seen this play out consistently. Our clients who invest in strategic PR alongside digital marketing see 3-5x better conversion rates on their paid campaigns. Why? Because by the time a prospect sees their ad, they've already read about them in a trusted publication.",
      "The lesson is clear: in Africa's digital economy, PR isn't a luxury. It's a competitive necessity.",
    ],
  },
  "personal-branding-executives": {
    title: "The Executive's Guide to Personal Branding in 2026",
    category: "Talent",
    date: "February 8, 2026",
    content: [
      "Your personal brand is your most undervalued asset. In a world where decision-makers Google you before they meet you, what they find determines whether you get the meeting, the deal, or the partnership.",
      "Personal branding for executives isn't about becoming an influencer. It's about strategic visibility — ensuring the right people see the right version of you at the right time.",
      "The most effective executive personal brands are built on three pillars: expertise positioning, narrative consistency, and strategic visibility. Get all three right, and you become the obvious choice in your industry.",
      "Start by defining your positioning. What specific intersection of expertise, experience, and perspective makes you uniquely valuable? This isn't about being everything to everyone. It's about being the definitive voice on something specific.",
      "Then build your narrative. Every piece of content, every speaking engagement, every media interview should reinforce the same core positioning. Consistency compounds.",
      "Finally, engineer your visibility. LinkedIn, industry publications, speaking engagements, podcast appearances — choose the channels where your target audience already pays attention, and show up consistently with valuable insights.",
    ],
  },
  "digital-marketing-roi": {
    title: "Stop Measuring Impressions. Start Measuring Impact.",
    category: "Digital Marketing",
    date: "January 28, 2026",
    content: [
      "Most digital marketing teams are drowning in data and starving for insight. They can tell you exactly how many people saw their ad, but they can't tell you whether those views actually moved the business forward.",
      "The problem isn't a lack of data. It's an obsession with vanity metrics — impressions, clicks, followers — that feel good in reports but mean nothing on the balance sheet.",
      "At ID8TORS, we've developed a framework we call 'Impact-First Marketing.' Instead of starting with channels and working toward metrics, we start with business outcomes and work backward to channels.",
      "What does this look like in practice? Before we launch any campaign, we define three things: the specific business outcome we're driving, the metric that directly measures that outcome, and the threshold that constitutes success.",
      "This approach eliminates waste. When every dollar is tied to a specific outcome, you stop spending on channels that generate impressions but not impact. You stop celebrating vanity metrics and start celebrating revenue.",
      "The brands that will dominate Africa's digital economy aren't the ones spending the most. They're the ones spending the smartest.",
    ],
  },
};

const InsightDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogData[slug] : null;

  if (!post) {
    return (
      <div className="pt-32 section-container text-center">
        <h1 className="heading-section text-foreground">Post not found</h1>
        <Link to="/insights" className="text-primary mt-4 inline-block">← Back to Insights</Link>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 bg-foreground text-primary-foreground">
        <div className="section-container max-w-3xl">
          <Link to="/insights" className="text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors mb-6 inline-block">
            ← All Insights
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-body text-primary-foreground/40 tracking-widest uppercase">{post.category}</span>
            <span className="text-xs text-primary-foreground/30">{post.date}</span>
          </div>
          <motion.h1
            className="heading-display text-primary-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {post.title}
          </motion.h1>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl">
          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default InsightDetail;
