import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  MessageCircle,
  MonitorPlay,
  Palette,
} from "lucide-react";

const steps = [
  {
    number: "01",
    category: "DISCOVER",
    title: "Tell Us Your Vision",
    description:
      "Start by sharing your brand, advertising goals, target audience and campaign requirements. We understand your needs to identify the right outdoor advertising opportunity.",
    icon: MessageCircle,
    visual: "brief",
    visualLabel: "Campaign briefing preview",
  },
  {
    number: "02",
    category: "STRATEGIZE",
    title: "Choose Your Media",
    description:
      "Explore our available outdoor advertising locations and media formats. Our team helps you identify suitable advertising spaces based on your campaign objectives.",
    icon: MapPin,
    visual: "map",
    visualLabel: "Map-inspired location preview",
  },
  {
    number: "03",
    category: "CREATE",
    title: "Prepare Your Campaign",
    description:
      "Share your advertisement artwork and finalise the creative, campaign duration and display schedule. Our team coordinates the campaign setup.",
    icon: Palette,
    visual: "creative",
    visualLabel: "Campaign artwork preview",
  },
  {
    number: "04",
    category: "GO LIVE",
    title: "Make Your Brand Visible",
    description:
      "Your advertisement goes live at the selected outdoor media location according to the agreed campaign schedule. It's time to put your brand in the spotlight.",
    icon: MonitorPlay,
    visual: "live",
    visualLabel: "Illuminated digital billboard preview",
  },
];

export function HowItWorks() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="how-section section-pad" aria-labelledby="how-heading">
      <div className="how-atmosphere" aria-hidden="true" />
      <div className="how-heading">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow how-eyebrow">OUR PROCESS</span>
          <h2 className="display how-title" id="how-heading">
            FROM VISION TO <span>VISIBILITY.</span>
          </h2>
        </motion.div>
        <motion.p
          className="how-intro"
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: reducedMotion ? 0 : 0.75,
            delay: reducedMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Bringing your brand into the spotlight is simple. Our streamlined four-step process takes
          your advertising campaign from the first conversation to the moment it goes live.
        </motion.p>
      </div>

      <div className="how-timeline">
        <motion.div
          className="how-timeline-progress how-timeline-progress--horizontal"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0 : 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="how-timeline-progress how-timeline-progress--vertical"
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <ol className="how-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.li
                className={`how-step how-step--${step.visual}`}
                key={step.number}
                initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.65,
                  delay: reducedMotion ? 0 : index * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="how-step-card">
                  <span className="how-step-number" aria-label={`Step ${step.number}`}>
                    {step.number}
                  </span>
                  <span className="how-step-node" aria-hidden="true">
                    <Icon size={21} strokeWidth={1.6} />
                  </span>

                  <div className={`how-step-visual how-visual--${step.visual}`} aria-hidden="true">
                    {step.visual === "brief" && (
                      <div className="brief-window">
                        <div className="brief-window-top">
                          <span />
                          <span />
                          <span />
                          <b>CAMPAIGN BRIEF</b>
                        </div>
                        <div className="brief-lines">
                          <i />
                          <i />
                          <i />
                        </div>
                        <span className="brief-send">
                          LET'S TALK <ArrowUpRight size={12} />
                        </span>
                      </div>
                    )}
                    {step.visual === "map" && (
                      <>
                        <div className="map-grid" />
                        <span className="map-route" />
                        <span className="map-pin map-pin--one">
                          <MapPin size={18} />
                        </span>
                        <span className="map-pin map-pin--two">
                          <MapPin size={15} />
                        </span>
                        <span className="map-label">BENGALURU</span>
                      </>
                    )}
                    {step.visual === "creative" && (
                      <div className="creative-frame">
                        <span className="creative-skyline" />
                        <span className="creative-copy">
                          MAKE
                          <br />
                          IT SEEN.
                        </span>
                        <span className="creative-swatch creative-swatch--one" />
                        <span className="creative-swatch creative-swatch--two" />
                        <span className="creative-swatch creative-swatch--three" />
                      </div>
                    )}
                    {step.visual === "live" && (
                      <div className="live-billboard">
                        <span className="live-scene">
                          <span>YOUR BRAND</span>
                          <i />
                        </span>
                        <span className="live-stand" />
                        <span className="live-ground" />
                        <span className="live-status">
                          <i /> LIVE
                        </span>
                      </div>
                    )}
                    <span className="how-visual-label">{step.visualLabel}</span>
                  </div>

                  <div className="how-step-copy">
                    <span className="how-step-category">{step.category}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <span className="how-step-next" aria-hidden="true">
                    {index < steps.length - 1 ? <ArrowRight size={17} /> : <ArrowDown size={17} />}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <motion.div
        className="how-cta"
        initial={reducedMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="how-cta-orbit" aria-hidden="true" />
        <div className="how-cta-copy">
          <span className="eyebrow">THE NEXT MOVE IS YOURS</span>
          <h3>READY TO PUT YOUR BRAND IN THE SPOTLIGHT?</h3>
          <p>Let&apos;s create an outdoor advertising campaign that gets your brand noticed.</p>
        </div>
        <a className="how-cta-button" href="#contact">
          START YOUR CAMPAIGN
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  );
}
