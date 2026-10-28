import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Menu, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import filmMain from '@/assets/sln-film-main.webm.asset.json';
import stillMain from '@/assets/sln-film-main-poster.jpg.asset.json';
import still1 from '@/assets/billboard-1.jpg.asset.json';
import still2 from '@/assets/billboard-2.jpg.asset.json';
import still3 from '@/assets/billboard-3.jpg.asset.json';
import still4 from '@/assets/billboard-4.jpg.asset.json';
import { companyData, siteNav } from '@/data/company';
import { adFormats, mediaLocations, nonLedMedia, services, upcomingLocations } from '@/data/media';
import { Footer, Wordmark } from '@/components/site-chrome';

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
const stills = [still1, still2, still3, still4];
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

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true }); update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <header className={`site-header ${scrolled || open ? 'site-header-scrolled' : ''}`}>
    <Wordmark />
    <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([name, href]) => <a key={name} href={href}>{name}</a>)}</nav>
    <Button type="button" variant="ghost" size="icon" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(([name, href], i) => <a key={name} href={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{name}<ArrowUpRight size={20}/></a>)}</nav>}
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
  const [hideText, setHideText] = useState(false);
  useEffect(() => { const t = window.setTimeout(() => setHideText(true), 6000); return () => window.clearTimeout(t); }, []);
  return <section className="hero" id="top" aria-label="SLN Auviora Media introduction">
  <video
    className="hero-video"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/videos/drone-main-1080p.mp4" type="video/mp4" />
  </video> 
    <div className="hero-shade" />
    <div className={`hero-inner ${hideText ? 'hero-text-hidden' : ''}`}>
      <motion.p className="eyebrow hero-eyebrow hero-fade-text" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .8 }}>OUTDOOR MEDIA, REIMAGINED <span className="eyebrow-rule"/></motion.p>
      <h1 className="hero-title hero-fade-text">{['MAKE YOUR BRAND', 'IMPOSSIBLE', 'TO MISS.'].map((line, i) => <span className="hero-line" key={line}><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ delay: .45 + i * .16, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span></span>)}</h1>
      <motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: .8 }}>
        <p className="hero-fade-text">Premium Outdoor Advertising<br/>& Billboard Media</p>
        <div className="hero-actions"><Button asChild className="button-gold"><a href="#media">EXPLORE OUR MEDIA <ArrowUpRight/></a></Button><Button asChild variant="outline" className="button-outline"><a href="#contact">CONTACT US <ArrowUpRight/></a></Button></div>
      </motion.div>
    </div>
    <a className="scroll-cue" href="#statement"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/></a>
    <span className="hero-index">01 / 10</span>
  </section>;
}

function Statement() {
  return <section id="statement" className="statement section-pad"><div className="statement-top"><span className="eyebrow">01 / THE IDEA</span><span className="small-meta">THE WORLD IS YOUR CANVAS</span></div><div className="statement-center"><motion.h2 {...fade} className="display statement-title">WE TURN ROADS<br/><em>INTO BRAND</em><br/>EXPERIENCES.</motion.h2><motion.p {...fade}>Outdoor advertising designed for visibility, scale and impact.</motion.p><BrandMarquee/></div><span className="statement-cross">✳</span></section>;
}


const marqueeBrands = ['UrbanEdge Retail', 'Horizon Foods', 'StyleZone', 'TechVibe', 'Namma Motors', 'Brigade Group', 'Royal Enfield', 'Decathlon'];
function BrandMarquee() {
  const row = (hidden: boolean) => <ul className="marquee-row" aria-hidden={hidden || undefined}>{marqueeBrands.map(b => <li key={b}>{b}<span className="marquee-sep" aria-hidden="true">✦</span></li>)}</ul>;
  return <div className="brand-marquee"><p className="marquee-heading">Trusted by ambitious brands across India</p><div className="marquee-viewport"><div className="marquee-track" style={{ '--marquee-duration': '46s' } as CSSProperties}>{row(false)}{row(true)}</div></div></div>;
}

function Experience() {
  return <section className="experience" aria-label="Outdoor media experience"><Video src="/videos/mid-video-1080p.mp4" poster={still2.url} className="experience-video"/><div className="experience-shade"/><div className="experience-content section-pad"><span className="eyebrow">03 / THE EXPERIENCE</span><motion.h2 {...fade} className="display">VISIBILITY<br/><em>WITHOUT</em><br/>INTERRUPTION.</motion.h2><motion.p {...fade} className="experience-quote">Your audience is already on the road.<br/>We put your brand in their path.</motion.p><div className="experience-features">{[['01','HIGH VISIBILITY','Strategic roadside placements.'],['02','LARGE FORMAT','Advertising that commands attention.'],['03','REAL-WORLD REACH','Brand exposure across high-traffic environments.']].map(([n,t,c]) => <motion.div {...fade} key={n} className="experience-feature"><span>{n}</span><h3>{t}</h3><p>{c}</p></motion.div>)}</div></div></section>;
}

function Media() {
  const getLocationWhatsAppUrl = (message: string) => {
    const url = new URL(companyData.whatsapp);
    url.searchParams.set('text', message);
    return url.toString();
  };

  return <section id="media" className="media"><div className="section-pad"><div className="section-heading"><span className="eyebrow">04 / MEDIA</span><motion.h2 {...fade} className="display">MEDIA<span className="media-title-period">.</span></motion.h2></div>
    <div className="media-subheading"><span className="eyebrow">01 / LED OUTDOOR MEDIA</span><motion.h3 {...fade} className="display">LED OUTDOOR<br/><em>MEDIA.</em></motion.h3><p>High-resolution P5 outdoor LED advertising positioned for high-visibility roadside exposure.</p></div>
    <div className="led-support"><motion.p {...fade}>LED displays provide visibility to commuters, vehicles, Metro passengers and pedestrians.</motion.p><motion.p {...fade}>Premium P5 Outdoor SMD LED using high-quality Kinglight Lamps, delivering bright, sharp, and reliable outdoor display performance.</motion.p></div>
    {mediaLocations.map(loc => <article key={loc.id} className="led-location">
      <div className="led-media"><Video src={loc.video} poster={loc.poster} className="panel-video"/><div className="panel-shade"/><div className="led-title"><span className="eyebrow">LOCATION {loc.number}</span><div className="led-title-heading"><h3 className="display">{loc.name}</h3>{loc.mapUrl && <Button asChild variant="outline" className="button-outline maps-link"><a href={loc.mapUrl} target="_blank" rel="noopener noreferrer"><svg className="maps-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M12 2a8 8 0 0 0-8 8c0 5.2 8 12 8 12s8-6.8 8-12a8 8 0 0 0-8-8Z"/><path fill="#34A853" d="M4.6 6.7A8 8 0 0 0 4 10c0 2.8 2.7 6.1 5 8.7l2-5.3Z"/><path fill="#FBBC04" d="M19.4 6.7A8 8 0 0 1 20 10c0 2.8-2.7 6.1-5 8.7l-2-5.3Z"/><path fill="#EA4335" d="M12 2a8 8 0 0 0-7.4 4.9l5.8 6.1L12 8l2-5.7A8 8 0 0 0 12 2Z"/><circle cx="12" cy="10" r="3" fill="#fff"/></svg> OPEN IN GOOGLE MAPS</a></Button>}</div><p>{loc.addressLines.map(l => <span key={l}>{l}<br/></span>)}</p></div></div>
      <div className="led-specs">{loc.note && <span className="led-note">{loc.note}</span>}<dl>{loc.specs.map(([k, v], i) => <motion.div key={k} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08, duration: .7 }}><dt>{k}</dt><dd>{v}</dd></motion.div>)}</dl><Button asChild variant="ghost" className="text-link"><a href={getLocationWhatsAppUrl(loc.enquiryMessage)} target="_blank" rel="noopener noreferrer">ENQUIRE ABOUT THIS SPACE <ArrowUpRight/></a></Button></div>
    </article>)}
    <div className="upcoming"><span className="eyebrow">UPCOMING</span><div className="upcoming-list">{upcomingLocations.map((l, i) => <motion.div {...fade} key={l} className="upcoming-item"><span>0{i + 1}</span><h3 className="display">{l}</h3></motion.div>)}</div><p>New outdoor advertising opportunities coming soon.</p></div>
    <div className="ad-formats"><span className="eyebrow">ADVERTISING OPTIONS</span><div className="ad-format-row">{adFormats.map(f => <motion.div {...fade} key={f}><strong className="display">{f.split(' ')[0]}</strong><span>SECOND FORMAT</span></motion.div>)}</div><p>Flexible 10-second and 15-second advertising formats.</p></div>
    <div className="led-timings"><span className="eyebrow">LED DISPLAY TIMINGS</span><dl><div><dt>MORNING SESSION</dt><dd>7:00 AM – 1:00 PM</dd></div><div><dt>AFTERNOON / EVENING SESSION</dt><dd>2:00 PM – 11:00 PM</dd></div><div><dt>PLAYBACK FREQUENCY</dt><dd>Approx. once every minute</dd></div></dl><p>Scheduled across 14 display hours, with a break from 1:00 PM to 2:00 PM. Your brand stays in rotation throughout our scheduled display hours, giving your campaign repeated visibility to commuters and pedestrians.</p></div></div>
    <NonLed />
  </section>;
}

type InventorySlide = { src: string; alt: string };
type InventoryCard = { title: string; images: [InventorySlide, ...InventorySlide[]]; location?: string };

function InventorySlideshow({ title, images, location }: { title: string; images: [InventorySlide, ...InventorySlide[]]; location?: string | undefined }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || images.length < 2) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % images.length), 3000);
    return () => window.clearInterval(timer);
  }, [images.length, isHovered]);

  const step = (direction: number) => {
    setIndex(current => (current + direction + images.length) % images.length);
  };

  const currentImage = images[index] ?? images[0];

  return (
    <div
      className="inventory-image"
      aria-label={`${title} photographs`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={currentImage.src} alt={currentImage.alt} />
      {location && <small className="inventory-location">{location}</small>}
      <button
        type="button"
        className="inventory-slideshow-arrow inventory-slideshow-prev"
        aria-label={`Previous ${title} image`}
        onClick={() => step(-1)}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        className="inventory-slideshow-arrow inventory-slideshow-next"
        aria-label={`Next ${title} image`}
        onClick={() => step(1)}
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}

function NonLed() {
  const inventoryCards: InventoryCard[] = [
    {
      title: 'ROAD MEDIA',
      images: [
        { src: '/images/road-media-live.JPG', alt: 'Road media advertising along Bannerghatta Road' },
        { src: '/images/road-media-live2.JPG', alt: 'Roadside media advertising in Bengaluru' },
      ],
      location: 'BANNERGHATTA ROAD',
    },
    {
      title: 'UNIPOLES AND HOARDINGS',
      images: [
        { src: '/images/unipole.JPG', alt: 'Unipole advertising boards along a road' },
        { src: '/images/hoaldings1.JPG', alt: 'Outdoor hoardings beside a road' },
        { src: '/images/hoaldings2.JPG', alt: 'Large roadside hoarding' },
        { src: '/images/hoaldings3.JPG', alt: 'Outdoor advertising hoardings' },
      ],
    },
    {
      title: 'GANTRIES',
      images: [
        { src: '/images/gyantri1.JPG', alt: 'Outdoor gantry advertising' },
        { src: '/images/gyantri2.jpg', alt: 'Gantry advertising on a city road' },
        { src: '/images/gyantri3.jpg', alt: 'Roadside advertising gantry' },
      ],
    },
    {
      title: 'LARGE OUTDOOR HOARDINGS',
      images: [
        { src: '/images/hoaldings.JPG', alt: 'Large outdoor hoardings' },
        { src: '/images/large-outdoor-hoardings1.jpg', alt: 'Large outdoor billboard hoarding' },
        { src: '/images/large-outdoor-hoardings2.jpg', alt: 'Large-format roadside hoarding' },
        { src: '/images/outdoor-hoardings.JPG', alt: 'Outdoor billboard hoardings along a street' },
        { src: '/images/outdoor-hoardings1.JPG', alt: 'Large outdoor billboard in an urban setting' },
      ],
    },
    {
      title: 'ELEVATED AND STATIC MOBILE BILLBOARDS',
      images: [
        { src: '/images/mobile_billboards.jpg', alt: 'Elevated and static mobile billboards in Bangalore' },
        { src: '/images/mobile_billboards2.jpg', alt: 'Mobile billboard advertising on a city road' },
      ],
    },
  ];

  return <div className="non-led section-pad"><div className="media-subheading"><span className="eyebrow">02 / NON-LED OUTDOOR MEDIA</span><motion.h3 {...fade} className="display">NON-LED<br/><em>OUTDOOR MEDIA.</em></motion.h3><p>Traditional outdoor advertising formats designed for high-visibility roadside brand presence.</p></div>
    <div className="inventory">
      {inventoryCards.map(c => <motion.article {...fade} className="inventory-group" key={c.title}>
        <InventorySlideshow title={c.title} images={c.images} location={c.location} />
        <div className="inventory-content">
  <h4>{c.title}</h4>
  <p className="inventory-address">
    {c.title === 'ROAD MEDIA' && 'Bannerghatta Road - 560083'}
    {c.title === 'UNIPOLES AND HOARDINGS' && 'Bannerghatta Road, Begur Road and Electronic City Road'}
    {c.title === 'GANTRIES' && 'Bannerghatta Road and Begur Road'}
    {c.title === 'LARGE OUTDOOR HOARDINGS' && 'Electronic City Road and Bannerghatta Road'}
    {c.title === 'ELEVATED AND STATIC MOBILE BILLBOARDS' && 'Bangalore'}
  </p>
</div>
      </motion.article>)}
    </div>
    
  </div>;
}

function Services() {
  const [active, setActive] = useState<number | null>(null);
  return <section id="services" className="services section-pad"><div className="section-heading"><span className="eyebrow">06 / OUR PRACTICE</span><motion.h2 {...fade} className="display">WHAT <em>WE DO.</em></motion.h2></div><div className="services-list">{services.map((item,i) => <div key={item} className={`service-row ${active === i ? 'service-active' : ''}`} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}><span>{String(i+1).padStart(2,'0')}</span><h3>{item}</h3><span className="service-icon">{active === i ? <Minus size={25}/> : <Plus size={25}/>}</span><div className="service-image" style={{ backgroundImage: `url(${stills[i%4]?.url ?? still1.url})` }}/></div>)}</div></section>;
}

function Gallery() {
  const [index, setIndex] = useState(0);
  const [failedIndex, setFailedIndex] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const reduced = useReducedMotion();
  const count = galleryImages.length;
  const startTimer = () => {
    window.clearInterval(timer.current);
    if (!reduced) timer.current = window.setInterval(() => setIndex(i => (i + 1) % count), 3000);
  };
  useEffect(() => { startTimer(); return () => window.clearInterval(timer.current); }, [reduced, count]);
  const step = (dir: number) => { setIndex(i => (i + dir + count) % count); startTimer(); };
  const currentImage = galleryImages[index] ?? galleryImages[0];
  return <section id="gallery" className="gallery section-pad"><div className="gallery-header"><div><span className="eyebrow">05 / GALLERY</span><motion.h2 {...fade} className="display">WHERE BRANDS<br/><em>MEET THE CITY.</em></motion.h2></div><p>Outdoor advertising environments<br/>in motion and in view.</p></div><div className="gallery-stage"><div className="gallery-image">{failedIndex === index ? <div role="status" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--soft)' }}>Image unavailable</div> : <img key={index} className="gallery-fade" src={currentImage.src} alt={currentImage.alt} onError={() => setFailedIndex(index)}/>}<button type="button" className="gallery-arrow gallery-prev" aria-label="Previous image" onClick={() => step(-1)}><ChevronLeft size={26}/></button><button type="button" className="gallery-arrow gallery-next" aria-label="Next image" onClick={() => step(1)}><ChevronRight size={26}/></button></div><p className="gallery-counter" aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</p></div></section>;
}

function WhyOutdoor() {
  const points = [['HIGH-RESOLUTION P5 LED','Premium P5 Outdoor SMD LED displays using high-quality Kinglight Lamps.'],['STRATEGIC ROADSIDE VISIBILITY','Media positioned in outdoor environments where commuters, vehicles, Metro passengers and pedestrians can see advertising.'],['FLEXIBLE AD FORMATS','10-second and 15-second advertising options.'],['EXTENDED DISPLAY HOURS','LED locations offer up to 15 hours of daily playtime according to the supplied media specifications.']];
  return <section className="why section-pad"><span className="eyebrow">08 / WHY SLN</span><div className="why-body"><motion.h2 {...fade} className="display">BUILT FOR<br/><em>THE REAL</em><br/>WORLD.</motion.h2><div className="why-side"><div className="why-list">{points.map(([t,c],i) => <div key={t} className="why-point"><span>0{i+1}</span><div><strong>{t}</strong><p>{c}</p></div></div>)}</div></div></div></section>;
}

function About() {
  return <section id="about" className="about section-pad"><span className="eyebrow">09 / THE COMPANY</span><div className="about-layout"><motion.h2 {...fade} className="display">WE MAKE<br/><em>BRANDS</em><br/>VISIBLE.</motion.h2><div className="about-copy"><img className="brand-poster" src="/images/sln-logo-side-final.png" alt="SLN Auviora Media blue and cyan brand wordmark" width={460} height={228} loading="lazy"/><p>SLN Auviora Media Private Limited provides outdoor advertising solutions through high-resolution LED displays, roadside media, unipoles, Hoarding and large-format outdoor advertising spaces.</p><p>With strategically positioned media formats, SLN helps brands communicate with audiences across roads, intersections and high-visibility urban environments.</p><div className="about-signature">SLN AUVIORA MEDIA<br/>PRIVATE LIMITED</div></div></div></section>;
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
          subject: String(data.get('requirement') || '').trim(),
          message: String(data.get('message') || '').trim(),
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
  return <section id="contact" className="contact section-pad"><div className="contact-top"><span className="eyebrow">10 / GET IN TOUCH</span><span className="small-meta">YOUR NEXT CAMPAIGN STARTS HERE</span></div><div className="contact-layout"><div><motion.h2 {...fade} className="display">LET'S PUT<br/>YOUR BRAND<br/><em>ON THE ROAD.</em></motion.h2><p>Tell us about your campaign and we'll help you identify the right outdoor media opportunity.</p><div className="contact-details"><strong>{companyData.name}</strong><a href={`tel:${companyData.mobile}`}>MOBILE · {companyData.mobile}</a><address>{companyData.addressLines.map(l => <span key={l}>{l}<br/></span>)}</address></div><div className="contact-ctas"><Button asChild className="button-gold"><a href={`tel:${companyData.mobile}`}>CALL NOW <ArrowUpRight/></a></Button><Button asChild variant="outline" className="button-outline"><a href={companyData.whatsapp} target="_blank" rel="noopener noreferrer">SEND ENQUIRY <ArrowUpRight/></a></Button></div></div><form id="enquiry" className="contact-form" onSubmit={submit}><div className="form-pair"><label>NAME <input name="name" type="text" required minLength={2} maxLength={100} placeholder="Your name"/></label><label>COMPANY <input name="company" type="text" minLength={2} maxLength={160} placeholder="Company name"/></label></div><div className="form-pair"><label>PHONE <input name="phone" type="tel" required minLength={6} maxLength={30} placeholder="Phone number"/></label><label>EMAIL <input name="email" type="email" maxLength={254} placeholder="Email address"/></label></div><label>CAMPAIGN / REQUIREMENT <input name="requirement" type="text" minLength={2} maxLength={240} placeholder="Tell us what you have in mind"/></label><label>MESSAGE <textarea name="message" minLength={5} maxLength={2000} rows={3} placeholder="A little more about your campaign"/></label><div className="form-bottom"><p role="status" aria-live="polite">{status === 'sent' ? 'Thank you for your enquiry! Our team will get back to you soon.' : status === 'error' ? 'We couldn’t send your enquiry. Please try again. If the problem continues, contact us by WhatsApp.' : 'We’ll be in touch about your campaign.'}</p><Button type="submit" className="button-gold" disabled={status === 'sending'}>{status === 'sending' ? 'SENDING...' : 'START A CONVERSATION'} <ArrowUpRight/></Button></div></form></div></section>;
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
  return <><ScrollProgress/><CustomCursor/><Navbar/><main><Hero/><Statement/><Experience/><Media/><Gallery/><Services/><WhyOutdoor/><About/><Contact/></main><Footer/></>;
}
