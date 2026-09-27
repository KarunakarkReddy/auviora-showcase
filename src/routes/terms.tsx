import { createFileRoute } from '@tanstack/react-router';
import { Footer, Wordmark } from '@/components/site-chrome';
import { terms, technicalDisclaimer } from '@/data/terms';

export const Route = createFileRoute('/terms')({
  head: () => ({ meta: [
    { title: 'Terms & Conditions | SLN Auviora Media' },
    { name: 'description', content: 'Terms and conditions for outdoor and LED advertising with SLN Auviora Media Private Limited.' },
    { property: 'og:title', content: 'Terms & Conditions | SLN Auviora Media' },
    { property: 'og:description', content: 'Terms and conditions for outdoor and LED advertising with SLN Auviora Media Private Limited.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Terms,
});

function Terms() {
  return <>
    <header className="site-header site-header-scrolled"><Wordmark /><nav className="desktop-nav" aria-label="Main navigation"><a href="/">BACK TO HOME</a></nav></header>
    <main className="terms section-pad">
      <span className="eyebrow">LEGAL</span>
      <h1 className="display">TERMS &<br/><em>CONDITIONS.</em></h1>
      <section className="terms-disclaimer" aria-labelledby="disclaimer-title">
        <h2 id="disclaimer-title">TECHNICAL SUPPORT & POWER INTERRUPTION DISCLAIMER</h2>
        {technicalDisclaimer.map(p => <p key={p}>{p}</p>)}
      </section>
      <ol className="terms-list">{terms.map(([title, copy], i) => <li key={title}><span>{String(i + 1).padStart(2, '0')}</span><div><h2>{title}</h2><p>{copy}</p></div></li>)}</ol>
    </main>
    <Footer />
  </>;
}
