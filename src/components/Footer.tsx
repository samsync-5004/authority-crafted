import { Link } from "react-router-dom";

const footerLinks = [
  {
    heading: "Company",
    links: [
      { label: "About", path: "/about" },
      { label: "Case Studies", path: "/case-studies" },
      { label: "Insights", path: "/insights" },
      { label: "Careers", path: "#" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "PR Strategy", path: "/services/pr-strategy" },
      { label: "Digital Marketing", path: "/services/digital-marketing" },
      { label: "Brand Storytelling", path: "/services/brand-storytelling" },
      { label: "Talent Management", path: "/services/talent-management" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Book a Call", path: "/book-strategy-call" },
      { label: "LinkedIn", path: "#" },
      { label: "Twitter / X", path: "#" },
      { label: "Instagram", path: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="section-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div>
            <span className="font-display text-2xl font-bold tracking-wider">
              ID8TORS
            </span>
            <p className="mt-4 text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              Premium PR, digital marketing, and brand strategy. We engineer authority.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h4 className="text-xs font-body font-semibold tracking-widest uppercase text-primary-foreground/40 mb-6">
                {group.heading}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} ID8TORS. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Lagos, Nigeria · Accra, Ghana
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
