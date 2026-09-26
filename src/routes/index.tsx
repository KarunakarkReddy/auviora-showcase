import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import film1 from '@/assets/billboard-1.mp4.asset.json';
import film2 from '@/assets/billboard-2.mp4.asset.json';
import film3 from '@/assets/billboard-3.mp4.asset.json';
import still1 from '@/assets/billboard-1.jpg.asset.json';
import still2 from '@/assets/billboard-2.jpg.asset.json';
import still3 from '@/assets/billboard-3.jpg.asset.json';
import still4 from '@/assets/billboard-4.jpg.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'SLN Auviora Media | Outdoor Advertising & Billboard Media' },
    { name: 'description', content: 'SLN Auviora Media provides premium outdoor advertising and billboard media solutions designed to put brands in high-visibility locations.' },
    { property: 'og:title', content: 'SLN Auviora Media | Outdoor Advertising & Billboard Media' },
    { property: 'og:description', content: 'Premium outdoor advertising and billboard media solutions designed to put brands in high-visibility locations.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Home,
});

const nav = [['ABOUT', '#about'], ['MEDIA', '#media'], ['SERVICES', '#services'], ['PROJECTS', '#projects'], ['CONTACT', '#contact']];
const showcase = [
  { number: '01', title: 'URBAN VISIBILITY', copy: 'Reach audiences where movement happens.', image: still1.url },
  { number: '02', title: 'HIGH-IMPACT PLACEMENT', copy: 'Built for brands that demand attention.', image: still2.url },
  { number: '03', title: 'STRATEGIC REACH', copy: 'Your message. Where the city sees it.', image: still3.url },
  { number: '04', title: 'BUILT FOR IMPACT', copy: 'Large-format media designed to be remembered.', image: still4.url },
];
const services = ['OUTDOOR BILLBOARD ADVERTISING', 'LARGE FORMAT MEDIA', 'ROADSIDES & HIGHWAY MEDIA', 'BRAND CAMPAIGN PLACEMENT', 'MEDIA SPACE MANAGEMENT', 'CUSTOM OUTDOOR CAMPAIGNS'];
const fade = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: .85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };

function Wordmark({ compact = false }: { compact?: boolean }) {
  return <a href="#top" className={`wordmark ${compact ? 'wordmark-small' : ''}`} aria-label="SLN Auviora Media, back to top"><span className="wordmark-monogram">SLN<span className="wordmark-dot">.</span></span><span className="wordmark-divider"/><span className="wordmark-name">AUVIORA<br/>MEDIA</span></a>;
}

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

function Video({ src, poster, eager = false, className = '' }: { src: string; poster: string; eager?: boolean; className?: string }) {
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
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .12 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (visible && !reduced) video.play().catch(() => {}); else video.pause();
  }, [visible, reduced]);
  return <video ref={ref} className={className} poster={poster} autoPlay={eager && !reduced} muted loop playsInline preload={eager ? 'metadata' : 'none'} aria-hidden="true">{!reduced && (eager || visible) && <source src={src} type="video/mp4" />}</video>;
}

function Hero() {
  const reduced = useReducedMotion();
  return <section className="hero" id="top" aria-label="SLN Auviora Media introduction">
    <Video src={film1.url} poster={still1.url} eager className="hero-video" />
    <div className="hero-shade" />
    <div className="hero-inner">
      <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .8 }}>OUTDOOR MEDIA, REIMAGINED <span className="eyebrow-rule"/></motion.p>
      <h1 className="hero-title">{['MAKE YOUR BRAND', 'IMPOSSIBLE', 'TO MISS.'].map((line, i) => <span className="hero-line" key={line}><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ delay: .45 + i * .16, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span></span>)}</h1>
      <motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: .8 }}>
        <p>Premium Outdoor Advertising<br/>& Billboard Media</p>
        <div className="hero-actions"><Button asChild className="button-gold"><a href="#media">EXPLORE OUR MEDIA <ArrowUpRight/></a></Button><Button asChild variant="outline" className="button-outline"><a href="#contact">CONTACT US <ArrowUpRight/></a></Button></div>
      </motion.div>
    </div>
    <a className="scroll-cue" href="#statement"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/></a>
    <span className="hero-index">01 / 10</span>
  </section>;
}

function Statement() {
  return <section id="statement" className="statement section-pad"><div className="statement-top"><span className="eyebrow">01 / THE IDEA</span><span className="small-meta">THE WORLD IS YOUR CANVAS</span></div><div className="statement-center"><motion.h2 {...fade} className="display statement-title">WE TURN ROADS<br/><em>INTO BRAND</em><br/>EXPERIENCES.</motion.h2><motion.p {...fade}>Outdoor advertising designed for visibility, scale and impact.</motion.p></div><span className="statement-cross">✳</span></section>;
}

function ShowcasePanel({ item }: { item: typeof showcase[number] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, .5, 1], [1.07, 1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  return <section ref={ref} className="showcase-panel" aria-label={item.title}>
    <motion.img src={item.image} alt={`Outdoor billboard placement illustrating ${item.title.toLowerCase()}`} loading="lazy" style={{ scale, y }} />
    <div className="panel-shade"/>
    <div className="showcase-content"><motion.div {...fade}><div className="panel-kicker"><span>{item.number} / 04</span><span className="panel-rule"/></div><h3 className="display">{item.title}</h3><p>{item.copy}</p></motion.div><ArrowUpRight className="panel-arrow" size={30}/></div>
  </section>;
}

function BillboardShowcase() {
  return <div className="showcase" id="showcase"><div className="section-intro section-pad"><span className="eyebrow">02 / THE PRESENCE</span><motion.h2 {...fade} className="display">A bigger<br/><em>point of view.</em></motion.h2><p>Not just seen. Remembered.</p></div>{showcase.map(item => <ShowcasePanel key={item.number} item={item}/>)}</div>;
}

function Experience() {
  return <section className="experience" aria-label="Outdoor media experience"><Video src={film2.url} poster={still2.url} className="experience-video"/><div className="experience-shade"/><div className="experience-content section-pad"><span className="eyebrow">03 / THE EXPERIENCE</span><motion.h2 {...fade} className="display">VISIBILITY<br/><em>WITHOUT</em><br/>INTERRUPTION.</motion.h2><motion.p {...fade} className="experience-quote">Your audience is already on the road.<br/>We put your brand in their path.</motion.p><div className="experience-features">{[['01','HIGH VISIBILITY','Strategic roadside placements.'],['02','LARGE FORMAT','Advertising that commands attention.'],['03','REAL-WORLD REACH','Brand exposure across high-traffic environments.']].map(([n,t,c]) => <motion.div {...fade} key={n} className="experience-feature"><span>{n}</span><h3>{t}</h3><p>{c}</p></motion.div>)}</div></div></section>;
}

function Media() {
  const [active, setActive] = useState(0);
  const selected = showcase[active];
  return <section id="media" className="media section-pad"><div className="section-heading"><span className="eyebrow">04 / THE NETWORK</span><motion.h2 {...fade} className="display">OUR <em>MEDIA.</em></motion.h2><p>Strategically positioned advertising spaces built for maximum visibility.</p></div><div className="media-layout"><div className="media-map"><div className="media-map-grid"/><span className="map-north">N ↑</span><div className="map-image"><img src={selected.image} alt={`Preview of location ${String(active + 1).padStart(2,'0')} billboard media`} loading="lazy"/></div>{showcase.map((_, i) => <Button key={i} variant="ghost" className={`map-pin map-pin-${i + 1} ${active === i ? 'map-pin-active' : ''}`} onClick={() => setActive(i)} aria-label={`View location ${String(i+1).padStart(2,'0')}`}>{String(i + 1).padStart(2, '0')}</Button>)}<div className="map-caption">SELECT A LOCATION <span>—</span> EXPLORE THE NETWORK</div></div><div className="media-list">{showcase.map((item, i) => <Button key={i} variant="ghost" className={`media-list-item ${active === i ? 'is-active' : ''}`} onClick={() => setActive(i)}><span className="media-list-number">0{i+1}</span><span>LOCATION {String(i+1).padStart(2,'0')}</span><ArrowUpRight size={18}/></Button>)}<div className="media-details"><span className="eyebrow">LOCATION {String(active + 1).padStart(2, '0')} / DETAILS</span><dl><div><dt>FORMAT / SIZE</dt><dd>Details on request</dd></div><div><dt>TRAFFIC / VISIBILITY</dt><dd>Details on request</dd></div><div><dt>AVAILABILITY</dt><dd>Enquire for availability</dd></div></dl><Button asChild variant="ghost" className="text-link"><a href="#contact">ENQUIRE ABOUT THIS SPACE <ArrowUpRight/></a></Button></div></div></div></section>;
}

function Services() {
  const [active, setActive] = useState<number | null>(null);
  return <section id="services" className="services section-pad"><div className="section-heading"><span className="eyebrow">05 / OUR PRACTICE</span><motion.h2 {...fade} className="display">WHAT <em>WE DO.</em></motion.h2></div><div className="services-list">{services.map((item,i) => <div key={item} className={`service-row ${active === i ? 'service-active' : ''}`} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}><span>{String(i+1).padStart(2,'0')}</span><h3>{item}</h3><span className="service-icon">{active === i ? <Minus size={25}/> : <Plus size={25}/>}</span><div className="service-image" style={{ backgroundImage: `url(${showcase[i%4].image})` }}/></div>)}</div></section>;
}

function Gallery() {
  return <section id="projects" className="gallery section-pad"><div className="gallery-header"><div><span className="eyebrow">06 / IN THE FIELD</span><motion.h2 {...fade} className="display">BRANDS<br/><em>BELONG</em><br/>OUT THERE.</motion.h2></div><p>Every street is a stage.<br/>Every journey, an opportunity.</p></div><div className="gallery-grid">{[still1,still2,still3,still4].map((image,i) => <a href="#contact" className={`gallery-image gallery-image-${i+1}`} key={i} aria-label={`Enquire about billboard format ${String(i+1).padStart(2,'0')}`}><img src={image.url} alt={`Outdoor billboard campaign environment ${String(i+1).padStart(2,'0')}`} loading="lazy"/><div className="gallery-overlay"><span>OUTDOOR / 0{i+1}</span><span>EXPLORE OPPORTUNITIES <ArrowUpRight size={19}/></span></div></a>)}</div></section>;
}

function WhyOutdoor() {
  return <section className="why section-pad"><span className="eyebrow">07 / WHY OUTDOOR</span><div className="why-body"><motion.h2 {...fade} className="display">BUILT FOR<br/><em>THE REAL</em><br/>WORLD.</motion.h2><div className="why-side"><p>Outdoor media connects brands with audiences during everyday movement — on roads, at intersections and across high-visibility urban environments.</p><div className="why-list">{['HIGH VISIBILITY','LARGE FORMAT','REAL-WORLD IMPACT'].map((s,i) => <div key={s}><span>0{i+1}</span><strong>{s}</strong><ArrowUpRight size={18}/></div>)}</div></div></div></section>;
}

function About() {
  return <section id="about" className="about section-pad"><span className="eyebrow">08 / THE COMPANY</span><div className="about-layout"><motion.h2 {...fade} className="display">WE MAKE<br/><em>BRANDS</em><br/>VISIBLE.</motion.h2><div className="about-copy"><span className="about-mark">SLN<span>.</span></span><p>SLN Auviora Media Private Limited delivers outdoor advertising solutions through strategically positioned billboard and large-format media spaces.</p><div className="about-signature">SLN AUVIORA MEDIA<br/>PRIVATE LIMITED</div></div></div></section>;
}

function Contact() {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    const { error } = await supabase.from('campaign_enquiries').insert({
      name: String(data.get('name') || '').trim(), company: String(data.get('company') || '').trim(),
      phone: String(data.get('phone') || '').trim(), email: String(data.get('email') || '').trim(),
      requirement: String(data.get('requirement') || '').trim(), message: String(data.get('message') || '').trim(),
    });
    if (error) setStatus('error'); else { setStatus('sent'); form.reset(); }
  }
  return <section id="contact" className="contact section-pad"><div className="contact-top"><span className="eyebrow">09 / GET IN TOUCH</span><span className="small-meta">YOUR NEXT CAMPAIGN STARTS HERE</span></div><div className="contact-layout"><div><motion.h2 {...fade} className="display">LET'S PUT<br/>YOUR BRAND<br/><em>ON THE ROAD.</em></motion.h2><p>Tell us about your campaign and we'll help you identify the right outdoor media opportunity.</p></div><form className="contact-form" onSubmit={submit}><div className="form-pair"><label>NAME <input name="name" type="text" required minLength={2} maxLength={100} placeholder="Your name"/></label><label>COMPANY <input name="company" type="text" required minLength={2} maxLength={160} placeholder="Company name"/></label></div><div className="form-pair"><label>PHONE <input name="phone" type="tel" required minLength={6} maxLength={30} placeholder="Phone number"/></label><label>EMAIL <input name="email" type="email" required maxLength={254} placeholder="Email address"/></label></div><label>CAMPAIGN / REQUIREMENT <input name="requirement" type="text" required minLength={2} maxLength={240} placeholder="Tell us what you have in mind"/></label><label>MESSAGE <textarea name="message" required minLength={5} maxLength={2000} rows={3} placeholder="A little more about your campaign"/></label><div className="form-bottom"><p role="status" aria-live="polite">{status === 'sent' ? 'Thank you. Your enquiry has been received.' : status === 'error' ? 'We couldn’t send your enquiry. Please try again.' : 'We’ll be in touch about your campaign.'}</p><Button type="submit" className="button-gold" disabled={status === 'sending'}>{status === 'sending' ? 'SENDING...' : 'START A CONVERSATION'} <ArrowUpRight/></Button></div></form></div></section>;
}

function Footer() {
  return <footer className="footer section-pad"><div className="footer-main"><div><Wordmark compact/><p>OUTDOOR MEDIA THAT MOVES WITH THE WORLD.</p></div><div className="footer-links"><span>EXPLORE</span>{nav.map(([name,href]) => <a href={href} key={name}>{name}</a>)}</div><div className="footer-links"><span>CONNECT</span><a href="#contact">CAMPAIGN ENQUIRIES <ArrowUpRight size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SLN AUVIORA MEDIA PRIVATE LIMITED</span><a href="#top">BACK TO TOP ↑</a><span>MADE TO BE SEEN.</span></div></footer>;
}

function CustomCursor() {
  const [point, setPoint] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState('');
  useEffect(() => {
    const move = (e: MouseEvent) => { setPoint({ x: e.clientX, y: e.clientY }); const target = e.target as HTMLElement; setMode(target.closest('.gallery-image, .showcase-panel') ? 'VIEW' : target.closest('a, button') ? 'OPEN' : ''); };
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
  return <><ScrollProgress/><CustomCursor/><Navbar/><main><Hero/><Statement/><BillboardShowcase/><Experience/><Media/><Services/><Gallery/><WhyOutdoor/><About/><Contact/></main><Footer/></>;
}
