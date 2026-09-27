import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { companyData, siteNav } from '@/data/company';

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return <a href="/#top" className={`wordmark ${compact ? 'wordmark-small' : ''}`} aria-label="SLN Auviora Media, back to top"><span className="wordmark-monogram">SLN<span className="wordmark-dot">.</span></span><span className="wordmark-divider"/><span className="wordmark-name">AUVIORA<br/>MEDIA</span></a>;
}

export function Footer() {
  return <footer className="footer section-pad"><div className="footer-main">
    <div><Wordmark compact/><p className="footer-company">SLN AUVIORA MEDIA<br/>PRIVATE LIMITED</p><p>{companyData.tagline.toUpperCase()}</p></div>
    <div className="footer-links"><span>EXPLORE</span>{siteNav.map(([name, href]) => <a href={href} key={name}>{name}</a>)}<Link to="/terms">TERMS & CONDITIONS</Link></div>
    <div className="footer-links"><span>CONNECT</span><a href={`tel:${companyData.mobile}`}>{companyData.mobile} <ArrowUpRight size={14}/></a><p className="footer-info">{companyData.shortLocation}</p><p className="footer-info">GSTIN: {companyData.gstin}</p><a href="/#payment" className="footer-subtle">PAYMENT DETAILS</a></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} {companyData.name}</span><a href="#top">BACK TO TOP ↑</a><span>MADE TO BE SEEN.</span></div></footer>;
}
