import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    slug: "pr-strategy",
    title: "PR Strategy",
    tagline: "Control the narrative before anyone else can.",
    description: "Media relations, crisis communications, and reputation management that positions you as the definitive voice in your industry.",
    points: [
      "Strategic media planning and journalist relationship building",
      "Crisis communications protocols and rapid response frameworks",
      "Reputation monitoring and sentiment analysis",
      "Press release crafting and distribution",
      "Executive positioning and thought leadership",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Performance-driven. Results-obsessed.",
    description: "Full-funnel digital campaigns across search, social, and programmatic channels that convert attention into revenue.",
    points: [
      "Paid social and search campaign management",
      "SEO strategy and content optimization",
      "Programmatic advertising and audience targeting",
      "Conversion rate optimization",
      "Analytics and ROI reporting",
    ],
  },
  {
    slug: "brand-storytelling",
    title: "Brand Storytelling",
    tagline: "Your brand is a story. We make it legendary.",
    description: "Narrative architecture that transforms your brand from a participant into a cultural reference point.",
    points: [
      "Brand identity development and positioning",
      "Content strategy and editorial planning",
      "Video production and visual storytelling",
      "Brand voice and messaging frameworks",
      "Cultural moment marketing",
    ],
  },
  {
    slug: "talent-management",
    title: "Talent Management",
    tagline: "Build the person. The brand follows.",
    description: "Strategic positioning and brand building for executives, creators, and public figures who demand authority.",
    points: [
      "Personal brand strategy and positioning",
      "Speaking engagement sourcing",
      "Media training and interview preparation",
      "Social media presence management",
      "Partnership and endorsement strategy",
    ],
  },
];

const Services = () => {
  return (
    <>
      <section className="pt-32 pb-20 skeuo-surface-dark text-primary-foreground">
        <div className="section-container">
          <motion.p
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary-foreground/50 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our Services
          </motion.p>
          <motion.h1
            className="heading-display text-primary-foreground max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Four pillars of
            <br />
            <span className="italic font-normal">digital dominance</span>
          </motion.h1>
        </div>
      </section>

      <section className="section-padding skeuo-surface-light">
        <div className="section-container">
          <div className="space-y-8">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                className="skeuo-card p-10 md:p-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <span className="text-xs font-body text-muted-foreground tracking-widest">
                      0{i + 1}
                    </span>
                    <h2 className="heading-section text-foreground mt-3 mb-2">
                      {service.title}
                    </h2>
                    <p className="text-primary italic text-lg mb-4">{service.tagline}</p>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                  <div>
                    <ul className="space-y-3 mb-8">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-muted-foreground">
                          <span className="mt-2 w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-3 text-sm font-medium text-primary uppercase tracking-wide hover:gap-5 transition-all duration-300"
                    >
                      Explore {service.title} <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
