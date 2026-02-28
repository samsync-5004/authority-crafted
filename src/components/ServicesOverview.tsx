import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "PR Strategy",
    description: "Media relations, crisis communications, and reputation management that positions you as the definitive voice in your industry.",
    slug: "pr-strategy",
  },
  {
    title: "Digital Marketing",
    description: "Performance-driven campaigns across search, social, and programmatic channels that convert attention into revenue.",
    slug: "digital-marketing",
  },
  {
    title: "Brand Storytelling",
    description: "Narrative architecture that transforms your brand from a participant into a cultural reference point.",
    slug: "brand-storytelling",
  },
  {
    title: "Talent Management",
    description: "Strategic positioning and brand building for executives, creators, and public figures who demand authority.",
    slug: "talent-management",
  },
];

const ServicesOverview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
            What We Do
          </p>
          <h2 className="heading-section text-foreground max-w-lg">
            Four pillars of
            <br />
            <span className="italic font-normal">digital dominance</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
              className="bg-background p-10 md:p-12 group"
            >
              <span className="text-xs font-body text-muted-foreground tracking-widest">
                0{i + 1}
              </span>
              <h3 className="heading-sub text-foreground mt-4 mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {service.description}
              </p>
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wide group-hover:gap-4 transition-all duration-300"
              >
                Learn More
                <span className="text-lg">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
