import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Instagram, Phone } from 'lucide-react';
import { companyData, siteNav } from '@/data/company';
import emblem from '@/assets/sln-emblem.jpg.asset.json';

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return <a href="/#top" className={`wordmark ${compact ? 'wordmark-small' : ''}`} aria-label="SLN Auviora Media, back to top"><img className="brand-logo" src={emblem.url} alt="SLN Auviora Media emblem" width={454} height={342} fetchPriority={compact ? 'auto' : 'high'}/></a>;
}

// CONFIGURE: paste the official SLN AUVIORA MEDIA Instagram profile URL here (e.g. https://www.instagram.com/your_handle/). Left empty until confirmed.
export const INSTAGRAM_PROFILE_URL = '';

export function FloatingContactBar() {
  return <nav className="contact-float-bar" aria-label="Quick contact">
    <a href="tel:+918951858999" className="contact-float contact-float-call" aria-label="Call SLN AUVIORA MEDIA" title="Call SLN AUVIORA MEDIA"><Phone size={22} aria-hidden="true"/></a>
    {INSTAGRAM_PROFILE_URL && <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="contact-float contact-float-ig" aria-label="Follow SLN AUVIORA MEDIA on Instagram" title="Follow SLN AUVIORA MEDIA on Instagram"><Instagram size={22} aria-hidden="true"/></a>}
    <a href={companyData.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-float contact-float-wa" aria-label="Chat with SLN AUVIORA MEDIA on WhatsApp" title="Chat with SLN AUVIORA MEDIA on WhatsApp"><svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4c-1.2-1.8-1.9-3.9-1.9-6 0-5.9 4.9-10.6 11-10.6s11 4.8 11 10.6-4.9 10.9-10.9 10.9zm6-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.6 4.9 2.8 1.1 3.3.9 3.9.8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg></a>
  </nav>;
}

export function Footer() {
  return <footer className="footer section-pad"><div className="footer-main">
    <div><Wordmark compact/><p className="footer-company">SLN AUVIORA MEDIA<br/>PRIVATE LIMITED</p><p>{companyData.tagline.toUpperCase()}</p></div>
    <div className="footer-links"><span>EXPLORE</span>{siteNav.map(([name, href]) => <a href={href} key={name}>{name}</a>)}<Link to="/terms">TERMS & CONDITIONS</Link></div>
    <div className="footer-links"><span>CONNECT</span><a href={`tel:${companyData.mobile}`}>{companyData.mobile} <ArrowUpRight size={14}/></a><p className="footer-info">{companyData.shortLocation}</p><p className="footer-info">GSTIN: {companyData.gstin}</p><a href="/#payment" className="footer-subtle">PAYMENT DETAILS</a></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} {companyData.name}</span><a href="/#top">BACK TO TOP ↑</a><span>MADE TO BE SEEN.</span></div></footer>;
}
