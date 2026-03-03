import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

const leaders = [
  { name: "Adaeze Okonkwo", role: "CEO & Co-Founder" },
  { name: "Tunde Adebayo", role: "Chief Strategy Officer" },
  { name: "Nkechi Eze", role: "Head of PR" },
  { name: "Kwame Mensah", role: "Creative Director" },
  { name: "Folake Williams", role: "Head of Digital" },
  { name: "Emeka Nwosu", role: "Head of Talent" },
  { name: "Amara Diallo", role: "Head of Brand" },
  { name: "Yemi Alade-Johnson", role: "Head of Operations" },
];

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 skeuo-surface-dark text-primary-foreground">
        <div className="section-container">
          <motion.p
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary-foreground/50 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            About Us
          </motion.p>
          <motion.h1
            className="heading-display text-primary-foreground max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            8 creatives. One mission.
            <br />
            <span className="italic font-normal">Redefine authority.</span>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding skeuo-surface-light">
        <div className="section-container max-w-3xl">
          <FadeIn>
            <h2 className="heading-section text-foreground mb-8">Our Story</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                ID8TORS was founded by eight multidisciplinary creatives who believed the African market deserved a communications partner that operated at the highest global standard.
              </p>
              <p>
                We didn't start with a pitch deck. We started with a problem: too many brilliant brands were being underserved by agencies that prioritized volume over impact. We chose to be different.
              </p>
              <p>
                From our base in Lagos, Nigeria, we've built a firm that combines strategic rigour with creative audacity. Every campaign we touch is engineered to move markets, shape narratives, and build lasting authority.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Vision & Mission — skeuomorphic cards */}
      <section className="section-padding bg-secondary">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn>
              <div className="skeuo-card p-10">
                <h3 className="heading-sub text-foreground mb-4">Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To become Africa's most respected communications firm — the agency that global brands call first when they want to win on the continent.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="skeuo-card p-10">
                <h3 className="heading-sub text-foreground mb-4">Mission</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We engineer digital authority for brands, leaders, and ideas that refuse to be ignored. Through precision strategy, bold storytelling, and relentless execution.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Leadership — skeuomorphic cards */}
      <section className="section-padding skeuo-surface-light">
        <div className="section-container">
          <FadeIn>
            <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Leadership
            </p>
            <h2 className="heading-section text-foreground mb-16">
              The <span className="italic font-normal">minds</span> behind the mission
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, i) => (
              <FadeIn key={leader.name} delay={i * 0.05}>
                <div className="skeuo-card overflow-hidden">
                  <div className="bg-muted aspect-[3/4] flex items-end p-6">
                    <div>
                      <p className="font-display text-lg font-semibold text-foreground">
                        {leader.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion */}
      <section className="section-padding skeuo-surface-dark text-primary-foreground">
        <div className="section-container text-center max-w-2xl mx-auto">
          <FadeIn>
            <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary-foreground/50 mb-4">
              Growth
            </p>
            <h2 className="heading-section text-primary-foreground mb-6">
              Lagos → Accra → <span className="italic font-normal">Beyond</span>
            </h2>
            <p className="text-primary-foreground/60 text-lg leading-relaxed">
              We're expanding across West Africa. Our Ghana office opens in 2026, bringing the same standard of strategic excellence to a new market hungry for serious communications partners.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default About;
