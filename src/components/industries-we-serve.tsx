import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const industries = [
  {
    number: "01",
    name: "Real Estate & Infrastructure",
    description:
      "Bring landmark developments into view. Build recognition where the city is growing.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Modern glass skyscrapers rising above a city",
    layout: "industry-card--featured",
  },
  {
    number: "02",
    name: "Automobile",
    description: "Make your next launch impossible to miss, at speed.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Sculpted detail of a premium automobile",
    layout: "",
  },
  {
    number: "03",
    name: "Jewellery & Luxury",
    description: "Give fine craftsmanship a stage worthy of its brilliance.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Elegant gold and gemstone jewellery",
    layout: "",
  },
  {
    number: "04",
    name: "Fashion & Lifestyle",
    description: "Turn seasonal stories and new collections into city-wide brand moments.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Fashion editorial portrait in a bold red outfit",
    layout: "industry-card--wide",
  },
  {
    number: "05",
    name: "Food & Beverage",
    description: "Make the next craving impossible to miss.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Warmly lit fine-dining restaurant table",
    layout: "",
  },
  {
    number: "06",
    name: "Healthcare",
    description: "Build trust for the care that keeps communities well.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Bright, contemporary healthcare facility",
    layout: "",
  },
  {
    number: "07",
    name: "Education",
    description: "Connect future-focused institutions with new audiences.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Contemporary university campus building",
    layout: "",
  },
  {
    number: "08",
    name: "Technology & Electronics",
    description: "Put your next big idea on a bigger stage.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Intricate detail of modern electronic hardware",
    layout: "",
  },
];

export function IndustriesWeServe() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="industries"
      className="industries-section section-pad"
      aria-labelledby="industries-heading"
    >
      <div className="industries-glow" aria-hidden="true" />
      <div className="industries-heading">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow industries-eyebrow">OUR EXPERTISE</span>
          <h2 className="display industries-title" id="industries-heading">
            INDUSTRIES <span>WE EMPOWER.</span>
          </h2>
        </motion.div>
        <motion.p
          className="industries-intro"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            delay: reducedMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          From ambitious startups to established enterprises, we help brands capture attention and
          create lasting impressions through impactful outdoor advertising solutions.
        </motion.p>
      </div>

      <div className="industries-grid">
        {industries.map((industry, index) => (
          <motion.a
            className={`industry-card ${industry.layout}`}
            href="#contact"
            aria-label={`Discuss outdoor advertising for ${industry.name}`}
            key={industry.number}
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: reducedMotion ? 0 : 0.65,
              delay: reducedMotion ? 0 : (index % 4) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              className="industry-card-image"
              src={industry.image}
              alt={industry.imageAlt}
              loading="lazy"
              decoding="async"
            />
            <span className="industry-card-number">{industry.number}</span>
            <span className="industry-card-content">
              <span className="industry-card-title">{industry.name}</span>
              <span className="industry-card-description">{industry.description}</span>
            </span>
            <span className="industry-card-arrow" aria-hidden="true">
              <ArrowUpRight size={19} strokeWidth={1.6} />
            </span>
          </motion.a>
        ))}
      </div>
      <div className="industries-footer" aria-hidden="true">
        <span>MADE TO BE SEEN</span>
        <span className="industries-footer-line" />
        <span>ACROSS EVERY INDUSTRY</span>
      </div>
    </section>
  );
}
