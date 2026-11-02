import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { companyData, siteNav } from '@/data/company';
import { Footer, Wordmark } from '@/components/site-chrome';
import { MediaLocationsSection } from '@/components/media-locations-section';
import { IndustriesWeServe } from "@/components/industries-we-serve";
import { HowItWorks } from "@/components/how-it-works";
import { FrequentlyAskedQuestions } from "@/components/frequently-asked-questions";

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'SLN Auviora Media | Outdoor Advertising & Billboard Media' },
    { name: 'description', content: 'SLN Auviora Media provides P5 LED boards, unipoles, Hoarding and roadside billboard media on Bannerghatta Road, Bengaluru.' },
    { property: 'og:title', content: 'SLN Auviora Media | Outdoor Advertising & Billboard Media' },
    { property: 'og:description', content: 'Premium outdoor advertising and billboard media solutions designed to put brands in high-visibility locations.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Home,
});

const nav = siteNav;
const galleryImages: [{ src: string; alt: string }, ...{ src: string; alt: string }[]] = [
  { src: '/images/sln-main-live-pic.png', alt: 'LED billboard and roadside advertising in Bengaluru' },
  { src: '/images/road-media-live.JPG', alt: 'Road media billboards along a city street' },
  { src: '/images/gyantri1.JPG', alt: 'Roadside billboard advertising in Bengaluru' },
  { src: '/images/road-media-live2.JPG', alt: 'Outdoor advertising on a busy Bengaluru road' },
  { src: '/images/unipole.JPG', alt: 'Unipole advertising boards along a road' },
  { src: '/images/hoaldings.JPG', alt: 'Large outdoor hoardings beside a roadway' },
  { src: '/images/hoaldings1.JPG', alt: 'Outdoor hoarding advertising in the city' },
  { src: '/images/hoaldings2.JPG', alt: 'Roadside hoarding advertising' },
  { src: '/images/hoaldings3.JPG', alt: 'Outdoor advertising hoardings' },
  { src: '/images/outdoor-hoardings.JPG', alt: 'Outdoor billboard hoardings along a street' },
  { src: '/images/outdoor-hoardings1.JPG', alt: 'Large outdoor billboard in an urban setting' },
  { src: '/images/mobile_billboards.jpg', alt: 'Elevated and static mobile billboards in Bangalore' },
  { src: '/images/road-media-live3.jpg', alt: 'Roadside outdoor media along a city street' },
  { src: '/images/mobile_billboards2.jpg', alt: 'Mobile billboard advertising on a city road' },
  { src: '/images/large-outdoor-hoardings1.jpg', alt: 'Large outdoor billboard hoarding' },
  { src: '/images/large-outdoor-hoardings2.jpg', alt: 'Large-format roadside hoarding' },
  { src: '/images/gyantri2.jpg', alt: 'Gantry advertising on a city road' },
  { src: '/images/gyantri3.jpg', alt: 'Roadside advertising gantry' },
];
const fade = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: .85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
const mediaServices = [
  { title: 'LED Outdoor Advertising', description: 'High-resolution P5 LED media at Bilekahalli Signal.', image: '/images/sln-main-live-pic.png', alt: 'SLN Auviora Media LED billboard at Bilekahalli Signal', featured: true, enquiryMessage: "Hi, I'm interested in LED Outdoor Advertising with SLN Auviora Media. Please share available locations, display specifications and pricing." },
  { title: 'Road Media', description: 'Road media placements across key Bengaluru corridors.', image: '/images/road-media-live.JPG', alt: 'Roadside advertising media in Bengaluru', enquiryMessage: "Hi SLN Auviora Media, I'm interested in Road Media advertising on Bannerghatta Road, Bengaluru. Please share availability, pricing and campaign details." },
  { title: 'Unipoles & Hoardings', description: 'Elevated formats and high-visibility boards along busy roads.', image: '/images/unipole.JPG', alt: 'Outdoor unipole advertising structure', enquiryMessage: "Hi, I'm interested in Unipole and Hoarding advertising across Bengaluru. Please share available locations, rates and booking details." },
  { title: 'Gantries', description: 'Road-spanning media formats for clear roadside presence.', image: '/images/gyantri1.JPG', alt: 'Outdoor advertising gantry', enquiryMessage: "Hi, I'm interested in Gantry advertising on Bannerghatta Road / Begur Road. Please share availability and pricing." },
  { title: 'Large Outdoor Hoardings', description: 'Scale-focused billboard opportunities for your campaign.', image: '/images/large-outdoor-hoardings1.jpg', alt: 'Large-format roadside billboard', enquiryMessage: "Hi, I'm interested in Large Outdoor Hoarding advertising near Electronic City Road / Bannerghatta Road. Please share details and pricing." },
  { title: 'Mobile Billboards', description: 'Mobile billboard advertising to reach audiences across Bengaluru.', image: '/images/mobile_billboards.jpg', alt: 'Mobile billboards in Bengaluru', enquiryMessage: "Hi, I'm interested in Mobile Billboard advertising in Bengaluru. Please share packages, availability and pricing." },
];
const getMediaServiceWhatsAppUrl = (message: string) => {
  const url = new URL(companyData.whatsapp);
  url.searchParams.set('text', message);
  return url.toString();
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true }); update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);
  return <header className={`site-header ${scrolled || open ? 'site-header-scrolled' : ''}`}>
    <Wordmark />
    <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([name, href]) => <a key={name} href={href}>{name}</a>)}</nav>
    <a className="header-quote" href="#contact">GET A MEDIA QUOTE <ArrowUpRight size={15}/></a>
    <Button type="button" variant="ghost" size="icon" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(current => !current)}>{open ? <X /> : <Menu />}</Button>
    <AnimatePresence>
      {open && (
        <motion.nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
          aria-hidden={!open}
          inert={!open}
          initial={reducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {nav.map(([name, href], i) => <a key={name} href={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{name}<ArrowUpRight size={20}/></a>)}
          <a className="mobile-nav-quote" href="#contact" onClick={() => setOpen(false)}>GET A MEDIA QUOTE <ArrowUpRight size={19}/></a>
        </motion.nav>
      )}
    </AnimatePresence>
  </header>;
}

function Video({ src, poster, eager = false, className = '', style }: { src: string; poster: string; eager?: boolean; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(eager);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: .12 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (visible && !reduced) video.play().catch(() => {}); else video.pause();
  }, [visible, reduced]);
  return <video ref={ref} className={className} style={style} src={!reduced && (eager || visible) ? src : undefined} poster={poster} autoPlay={eager && !reduced} muted loop playsInline preload={eager ? 'metadata' : 'none'} aria-hidden="true" />;
}

function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="hero" id="top" aria-label="SLN Auviora Media introduction">
      <img
        className="hero-image"
        src="/images/sln-main-live-pic.png"
        alt=""
        width={1447}
        height={1087}
        fetchPriority="high"
        decoding="async"
      />
      <video
        className="experience-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/sln-main-live-pic.png"
        aria-hidden="true"
      >
        <source src="/videos/drone-main-1080p.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <div className="hero-inner">
        <motion.p
          className="eyebrow hero-eyebrow"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.2, duration: reduced ? 0 : 0.65 }}
        >
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          OUTDOOR MEDIA <span aria-hidden="true">/</span> BRAND EXPERIENCES
        </motion.p>
        <h1 className="hero-title">
          <motion.span
            className="hero-line"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduced ? 0 : 0.3,
              duration: reduced ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            MAKE YOUR
          </motion.span>
          <motion.span
            className="hero-line"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduced ? 0 : 0.42,
              duration: reduced ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            BRAND <em>IMPOSSIBLE</em>
          </motion.span>
          <motion.span
            className="hero-line"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduced ? 0 : 0.54,
              duration: reduced ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            TO <em>MISS.</em>
          </motion.span>
        </h1>
        <div className="hero-bottom">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.68, duration: reduced ? 0 : 0.65 }}
          >
            Transform your brand visibility with premium outdoor advertising solutions, strategic
            media locations and impactful LED billboard experiences.
          </motion.p>
          <div className="hero-actions">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.82, duration: reduced ? 0 : 0.55 }}
            >
              <Button asChild className="button-gold">
                <a href="#media">
                  EXPLORE OUR MEDIA <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.94, duration: reduced ? 0 : 0.55 }}
            >
              <Button asChild variant="outline" className="button-outline">
                <a href="#contact">
                  GET A MEDIA QUOTE <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <aside className="hero-media-note" aria-label="Featured media location">
        <span className="hero-media-note-label">FEATURED LED LOCATION</span>
        <strong>BILEKAHALLI SIGNAL</strong>
        <span>Bannerghatta Main Road · Bengaluru</span>
        <span className="hero-media-note-spec">P5 OUTDOOR LED</span>
      </aside>
      <a className="scroll-cue" href="#statement">
        <span>SCROLL TO EXPLORE</span>
        <span className="scroll-line" />
      </a>
    </section>
  );
}

function Statement() {
  return <section id="statement" className="statement section-pad"><div className="statement-top"><span className="eyebrow">01 / THE IDEA</span><span className="small-meta">THE WORLD IS YOUR CANVAS</span></div><div className="statement-center"><motion.h2 {...fade} className="display statement-title">WE TURN ROADS<br/><em>INTO BRAND</em><br/>EXPERIENCES.</motion.h2><motion.p {...fade}>Outdoor advertising designed for visibility, scale and impact.</motion.p><BrandMarquee/></div><span className="statement-cross">✳</span></section>;
}


const mediaPillars = ['LED SCREENS', 'ROADSIDE MEDIA', 'UNIPOLES', 'HOARDINGS', 'GANTRIES', 'LARGE FORMAT'];
function BrandMarquee() {
  const row = (hidden: boolean) => <ul className="marquee-row" aria-hidden={hidden || undefined}>{mediaPillars.map(item => <li key={item}>{item}<span className="marquee-sep" aria-hidden="true">✦</span></li>)}</ul>;
  return <div className="brand-marquee"><p className="marquee-heading">Outdoor formats designed to meet the city in motion</p><div className="marquee-viewport"><div className="marquee-track" style={{ '--marquee-duration': '46s' } as CSSProperties}>{row(false)}{row(true)}</div></div></div>;
}

function Experience() {
  return <section className="experience" aria-label="Outdoor media experience"><Video src="/videos/mid-video-1080p.mp4" poster="/images/sln-main-live-pic.png" className="experience-video"/><div className="experience-shade"/><div className="experience-content section-pad"><span className="eyebrow">03 / THE EXPERIENCE</span><motion.h2 {...fade} className="display">VISIBILITY<br/><em>WITHOUT</em><br/>INTERRUPTION.</motion.h2><motion.p {...fade} className="experience-quote">Your audience is already on the road.<br/>We put your brand in their path.</motion.p><div className="experience-features">{[['01','HIGH VISIBILITY','Strategic roadside placements.'],['02','LARGE FORMAT','Advertising that commands attention.'],['03','REAL-WORLD REACH','Brand exposure across high-traffic environments.']].map(([n,t,c]) => <motion.div {...fade} key={n} className="experience-feature"><span>{n}</span><h3>{t}</h3><p>{c}</p></motion.div>)}</div></div></section>;
}

function Services() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="services" className="services section-pad" aria-labelledby="services-heading">
      <div className="section-heading">
        <span className="eyebrow">06 / OUR PRACTICE</span>
        <motion.h2 {...fade} className="display" id="services-heading">
          MEDIA <em>SOLUTIONS.</em>
        </motion.h2>
        <p>Outdoor formats matched to the places, audiences and scale your campaign needs.</p>
      </div>
      <div className="service-bento">
        {mediaServices.map((service, index) => (
          <motion.a
            className={`service-card${service.featured ? " service-card--featured" : ""}`}
            href={getMediaServiceWhatsAppUrl(service.enquiryMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${service.title} via WhatsApp`}
            key={service.title}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{
              duration: reducedMotion ? 0 : 0.6,
              delay: reducedMotion ? 0 : (index % 3) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img src={service.image} alt={service.alt} loading="lazy" decoding="async" />
            <span className="service-card-shade" aria-hidden="true" />
            <span className="service-card-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="service-card-copy">
              <span className="service-card-title">{service.title}</span>
              <span className="service-card-description">{service.description}</span>
            </span>
            <span className="service-card-arrow" aria-hidden="true"><ArrowUpRight size={19}/></span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const selectedImage = galleryImages[selectedIndex];

  useEffect(() => {
    const nextImage = new Image();
    nextImage.src = galleryImages[(selectedIndex + 1) % galleryImages.length].src;
  }, [selectedIndex]);

  useEffect(() => {
    if (isHovered) return;
    const intervalId = window.setInterval(() => {
      setSelectedIndex(index => (index + 1) % galleryImages.length);
    }, 2500);
    return () => window.clearInterval(intervalId);
  }, [isHovered]);

  const showAdjacentImage = (direction: number) => {
    setSelectedIndex(index => (index + direction + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="gallery" className="gallery" aria-labelledby="gallery-heading">
      <div className="gallery-header">
        <div>
          <span className="eyebrow">05 / GALLERY</span>
          <motion.h2 {...fade} className="display" id="gallery-heading">
            WHERE BRANDS<br /><em>MEET THE CITY.</em>
          </motion.h2>
        </div>
        <p>Real outdoor advertising environments and media locations in Bengaluru.</p>
      </div>
      <div
        className="gallery-carousel"
        role="region"
        aria-label="Gallery image carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="gallery-carousel-frame" aria-live="off">
          <img
            key={selectedImage.src}
            className="gallery-carousel-image"
            src={selectedImage.src}
            alt={selectedImage.alt}
            decoding="async"
            fetchPriority="high"
          />
          <button
            type="button"
            className="gallery-arrow gallery-prev"
            aria-label="Previous gallery image"
            onClick={() => showAdjacentImage(-1)}
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="gallery-arrow gallery-next"
            aria-label="Next gallery image"
            onClick={() => showAdjacentImage(1)}
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>
        <div
          className="gallery-carousel-footer"
          aria-live="off"
          aria-label={`Image ${String(selectedIndex + 1).padStart(2, '0')} of ${String(galleryImages.length).padStart(2, '0')}`}
        >
          <span>{String(selectedIndex + 1).padStart(2, '0')}</span>
          <span aria-hidden="true">/</span>
          <span>{String(galleryImages.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}

function WhyOutdoor() {
  const points = [['HIGH-RESOLUTION P5 LED','Premium P5 Outdoor SMD LED displays using high-quality Kinglight Lamps.'],['STRATEGIC ROADSIDE VISIBILITY','Media positioned in outdoor environments where commuters, vehicles, Metro passengers and pedestrians can see advertising.'],['FLEXIBLE AD FORMATS','10-second and 15-second advertising options.'],['EXTENDED DISPLAY HOURS','LED locations offer up to 15 hours of daily playtime according to the supplied media specifications.']];
  return <section className="why section-pad"><span className="eyebrow">08 / WHY SLN</span><div className="why-body"><motion.h2 {...fade} className="display">BUILT FOR<br/><em>THE REAL</em><br/>WORLD.</motion.h2><div className="why-side"><div className="why-list">{points.map(([t,c],i) => <div key={t} className="why-point"><span>0{i+1}</span><div><strong>{t}</strong><p>{c}</p></div></div>)}</div></div></div></section>;
}

function About() {
  return <section id="about" className="about section-pad"><span className="eyebrow">09 / THE COMPANY</span><div className="about-layout"><motion.h2 {...fade} className="display">WE TURN<br/><em>LOCATIONS</em><br/>INTO BRAND<br/>EXPERIENCES.</motion.h2><div className="about-copy"><img className="brand-poster" src="/images/sln-logo-side-final.png" alt="SLN Auviora Media blue and cyan brand wordmark" width={460} height={228} loading="lazy"/><p>SLN Auviora Media helps brands connect with audiences through strategic outdoor advertising opportunities, premium LED displays and high-visibility media locations.</p><p>From roadside media to large-format outdoor advertising, our team helps businesses find the right spaces to put their brand in view.</p><div className="about-signature">SLN AUVIORA MEDIA<br/>PRIVATE LIMITED</div></div></div></section>;
}

function Contact() {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const submissionInProgress = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;
    submissionInProgress.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');

    try {
      const response = await fetch('https://uqmzwnbeslssjvvuvrdg.supabase.co/functions/v1/send-enquiry-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || '').trim(),
          company: String(data.get('company') || '').trim(),
          phone: String(data.get('phone') || '').trim(),
          email: String(data.get('email') || '').trim(),
          subject: [
            String(data.get('requirement') || '').trim(),
            String(data.get('format') || '').trim(),
          ].filter(Boolean).join(' · '),
          message: [
            String(data.get('message') || '').trim(),
            `Preferred location: ${String(data.get('location') || 'No preference').trim()}`,
            `Campaign duration: ${String(data.get('duration') || 'To be discussed').trim()}`,
          ].join('\n\n'),
        }),
      });
      const result: unknown = await response.json();
      if (
        !response.ok ||
        result === null ||
        typeof result !== 'object' ||
        !('success' in result) ||
        result.success !== true ||
        !('adminEmailAccepted' in result) ||
        result.adminEmailAccepted !== true
      ) {
        throw new Error(`Enquiry request failed (HTTP ${response.status})`);
      }

      setStatus('sent');
      form.reset();
    } catch (error) {
      console.error('Unable to send enquiry', error);
      setStatus('error');
    } finally {
      submissionInProgress.current = false;
    }
  }
  return <section id="contact" className="contact section-pad"><div className="contact-top"><span className="eyebrow">10 / GET IN TOUCH</span><span className="small-meta">YOUR NEXT CAMPAIGN STARTS HERE</span></div><div className="contact-layout"><div><motion.h2 {...fade} className="display">LET'S PUT<br/>YOUR BRAND<br/><em>ON THE ROAD.</em></motion.h2><p>Have a campaign in mind? Let's find the right outdoor advertising opportunity for your brand.</p><div className="contact-details"><strong>{companyData.name}</strong><a href={`tel:${companyData.mobile}`}>MOBILE · {companyData.mobile}</a><address>{companyData.addressLines.map(l => <span key={l}>{l}<br/></span>)}</address></div><div className="contact-ctas"><Button asChild className="button-gold"><a href={`tel:${companyData.mobile}`}>CALL NOW <ArrowUpRight/></a></Button><Button asChild variant="outline" className="button-outline"><a href={companyData.whatsapp} target="_blank" rel="noopener noreferrer">SEND ENQUIRY <ArrowUpRight/></a></Button></div></div><form id="enquiry" className="contact-form" onSubmit={submit}><div className="form-pair"><label>FULL NAME <input name="name" type="text" required minLength={2} maxLength={100} placeholder="Your name"/></label><label>COMPANY <input name="company" type="text" minLength={2} maxLength={160} placeholder="Company name"/></label></div><div className="form-pair"><label>PHONE <input name="phone" type="tel" required minLength={6} maxLength={30} placeholder="Phone number"/></label><label>EMAIL <input name="email" type="email" maxLength={254} placeholder="Email address"/></label></div><div className="form-pair"><label>PREFERRED ADVERTISING FORMAT <select name="format" defaultValue=""><option value="">Select a format</option><option>LED outdoor advertising</option><option>Roadside advertising</option><option>Unipole advertising</option><option>Hoarding or gantry</option><option>Other outdoor media</option></select></label><label>PREFERRED LOCATION <select name="location" defaultValue=""><option value="">No preference yet</option><option>Bilekahalli Signal, Bannerghatta Main Road</option><option>Sarjapura Road (upcoming)</option><option>Kanakapura Road (upcoming)</option><option>Other / please advise</option></select></label></div><div className="form-pair"><label>CAMPAIGN DURATION <input name="duration" type="text" maxLength={120} placeholder="For example, 2 weeks"/></label><label>CAMPAIGN / REQUIREMENT <input name="requirement" type="text" minLength={2} maxLength={240} placeholder="What are you looking to promote?"/></label></div><label>MESSAGE <textarea name="message" minLength={5} maxLength={2000} rows={3} placeholder="Share more about your campaign"/></label><div className="form-bottom"><p role="status" aria-live="polite">{status === 'sent' ? 'Thank you for your enquiry! Our team will get back to you soon.' : status === 'error' ? 'We couldn’t send your enquiry. Please try again. If the problem continues, contact us by WhatsApp.' : 'We’ll be in touch about your campaign.'}</p><Button type="submit" className="button-gold" disabled={status === 'sending'}>{status === 'sending' ? 'SENDING...' : 'START A CONVERSATION'} <ArrowUpRight/></Button></div></form></div></section>;
}

function CustomCursor() {
  const [point, setPoint] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState('');
  useEffect(() => {
    const move = (e: MouseEvent) => { setPoint({ x: e.clientX, y: e.clientY }); const target = e.target as HTMLElement; setMode(target.closest('.gallery-image, .led-media') ? 'VIEW' : target.closest('a, button') ? 'OPEN' : ''); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className={`custom-cursor ${mode ? 'cursor-expanded' : ''}`} style={{ left: point.x, top: point.y }} aria-hidden="true">{mode}</div>;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }}/>
}

function Home() {
  return <><ScrollProgress/><CustomCursor/><Navbar/><main><Hero/><Statement/><Experience/><MediaLocationsSection/><Gallery/><Services/><WhyOutdoor/><IndustriesWeServe/><HowItWorks/><About/><FrequentlyAskedQuestions/><Contact/></main><Footer/></>;
}
