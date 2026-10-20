/** Tropical Civic Atlas page: asymmetric editorial wayfinding for Menara Keagungan Limboto. */
import React, { useState } from "react";
import {
  Accessibility, ArrowDownRight, ArrowUpRight, CarFront, ChevronDown, CloudSun, Clock3, Compass, ExternalLink,
  Fuel, MapPin, Navigation, Ticket, Timer, Utensils, Wifi, BedDouble, ShoppingBasket, BatteryCharging, BookOpenText,
} from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { copy, govTourismUrl, mapHref, siteName, siteUrl, type Locale } from "@/lib/siteContent";

const guideIdentity = "/assets/icon-512.png";
const mark = "/assets/icon-192.png";
const seal = "/assets/icon-192.png";

const iconMap = { Clock3, Timer, Ticket, CarFront, Accessibility, CloudSun };
const serviceIconMap = { Toilet: Accessibility, CarFront, Utensils, BedDouble, ShoppingBasket, Fuel, BatteryCharging };

type HomeProps = {
  locale: Locale;
  onLocaleToggle: () => void;
};

export default function Home({ locale, onLocaleToggle }: HomeProps) {
  const t = copy[locale];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="atlas-shell">
      <a className="skip-link" href="#main-content">{locale === "id" ? "Langsung ke isi" : "Skip to content"}</a>
      <header className="site-header">
        <a href="#top" className="brand" aria-label={siteName}>
          <img className="brand__mark" src={mark} alt="" />
          <span className="brand__words"><span>MENARA KEAGUNGAN</span><small>LIMBOTO GUIDE</small></span>
        </a>
        <nav id="main-nav" className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}>
          <a href="#about" onClick={() => setMenuOpen(false)}>{t.nav.about}</a>
          <a href="#visit" onClick={() => setMenuOpen(false)}>{t.nav.visit}</a>
          <a href="#nearby" onClick={() => setMenuOpen(false)}>{t.nav.nearby}</a>
          <a href="#map" onClick={() => setMenuOpen(false)}>{t.nav.map}</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>{t.nav.faq}</a>
        </nav>
        <div className="header-actions">
          <LanguageToggle locale={locale} onToggle={onLocaleToggle} label={t.language} shortLabel={t.languageShort} />
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav" aria-label={locale === "id" ? "Buka navigasi" : "Open navigation"}><span /><span /></button>
        </div>
      </header>

      <main id="main-content">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero__edge-label">{t.nonOfficial}</div>
          <div className="hero__copy reveal">
            <p className="hero__eyebrow"><span /> {t.eyebrow}</p>
            <nav className="hero__breadcrumb" aria-label={locale === "id" ? "Hierarki lokasi" : "Location hierarchy"}>
              <ol>
                <li>{t.breadcrumb.landmark}</li>
                <li>{t.breadcrumb.city}</li>
                <li>{t.breadcrumb.region}</li>
                <li>{t.breadcrumb.country}</li>
              </ol>
            </nav>
            <h1 id="hero-title">{t.heroTitle.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h1>
            <p className="hero__body">{t.heroBody}</p>
            <div className="hero__actions">
              <a className="button button--filled" href={mapHref} target="_blank" rel="noreferrer"><Navigation size={16} /> {t.mapButton}</a>
              <a className="button button--quiet" href="#visit"><ArrowDownRight size={17} /> {t.exploreButton}</a>
            </div>
          </div>
          <figure className="hero__photo reveal reveal--late">
            <img src={guideIdentity} alt="" />
            <figcaption>{t.photoCredit}</figcaption>
            <div className="hero__photo-badge"><MapPin size={16} /><span>{locale === "id" ? "Kayubulan · Limboto" : "Kayubulan · Limboto"}</span></div>
          </figure>
          <aside className="hero__facts" aria-label={locale === "id" ? "Ringkasan tempat" : "Place snapshot"}>
            <div><span>{t.mapLabel}</span><strong>0.6269984° N<br />122.9798882° E</strong></div>
            <div><span>{t.ratingLabel}</span><strong>{t.ratingValue}<small>{t.reviewValue}</small></strong></div>
            <p>{t.updated}</p>
          </aside>
        </section>

        <section id="about" className="content-section content-section--intro">
          <div className="section-rail"><span>{t.introKicker}</span><div /></div>
          <div className="intro-layout">
            <div className="intro-layout__copy">
              <p className="section-kicker">{t.introKicker}</p>
              <h2>{t.introTitle}</h2>
              <p className="body-large">{t.introBody}</p>
              <div className="source-note"><Compass size={19} /><p>{t.introNote} <a href={mapHref} target="_blank" rel="noreferrer">{t.sourceLink} <ArrowUpRight size={13} /></a></p></div>
            </div>
            <div className="intro-layout__visual" aria-hidden="true">

              <div className="intro-layout__visual-word">LIMBOTO<br />GORONTALO</div>
            </div>
          </div>
        </section>

        <section className="content-section content-section--history" aria-labelledby="history-title">
          <div className="section-rail"><span>{t.historyKicker}</span><div /></div>
          <div className="history-layout">
            <div className="history-layout__lead"><p className="section-kicker">{t.historyKicker}</p><h2 id="history-title">{t.historyTitle}</h2><p className="body-large">{t.historyBody}</p><div className="history-caution"><BookOpenText size={20} /><p>{t.historyCaution}</p></div></div>
            <ol className="history-timeline">{t.history.map((item) => <li key={item.year}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
          </div>
          <div className="history-sources" aria-label={locale === "id" ? "Sumber sejarah dan konteks" : "History and context sources"}>{t.historySources.map((source) => <a key={source.title} href={source.href} target="_blank" rel="noreferrer"><span>{source.title}</span><small>{source.body}</small><ArrowUpRight size={16} /></a>)}</div>
        </section>

        <section id="visit" className="content-section content-section--visit">
          <div className="section-rail"><span>{t.practicalKicker}</span><div /></div>
          <div className="section-heading">
            <div><p className="section-kicker">{t.practicalKicker}</p><h2>{t.practicalTitle}</h2></div>
            <p>{t.practicalSubtitle}</p>
          </div>
          <div className="practical-grid">
            {t.practical.map((item, index) => {
              const Icon = iconMap[item.icon];
              return <article className="practical-card" key={item.label}><div className="practical-card__top"><span>0{index + 1}</span><Icon size={19} strokeWidth={1.7} /></div><p>{item.label}</p><h3>{item.title}</h3><p className="practical-card__body">{item.body}</p></article>;
            })}
          </div>
        </section>

        <section className="content-section content-section--access">
          <div className="section-rail"><span>{t.accessKicker}</span><div /></div>
          <div className="access-layout">
            <div className="access-layout__title"><p className="section-kicker">{t.accessKicker}</p><h2>{t.accessTitle}</h2><p>{t.accessLead}</p><img src={seal} alt="" /></div>
            <ol className="route-list">{t.transport.map((item) => <li key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
          </div>
        </section>

        <section className="content-section content-section--services" aria-labelledby="services-title">
          <div className="section-rail"><span>{t.serviceKicker}</span><div /></div>
          <div className="services-heading"><div><p className="section-kicker">{t.serviceKicker}</p><h2 id="services-title">{t.serviceTitle}</h2></div><p>{t.serviceLead}</p></div>
          <div className="services-grid">{t.services.map((item, index) => { const Icon = serviceIconMap[item.icon]; return <article key={item.title} className="service-card"><span>0{index + 1}</span><Icon size={24} strokeWidth={1.5} /><h3>{item.title}</h3><p>{item.body}</p></article>; })}</div>
        </section>

        <section id="nearby" className="content-section content-section--nearby">
          <div className="section-rail"><span>{t.nearbyKicker}</span><div /></div>
          <div className="nearby-head"><div><p className="section-kicker">{t.nearbyKicker}</p><h2>{t.nearbyTitle}</h2></div><div className="utility-icons" aria-hidden="true"><Utensils /><Fuel /><Wifi /></div></div>
          <div className="nearby-list">{t.nearby.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></article>)}</div>
        </section>

        <section id="map" className="content-section content-section--map">
          <div className="section-rail"><span>{t.mapKicker}</span><div /></div>
          <div className="map-layout"><div className="map-layout__copy"><p className="section-kicker">{t.mapKicker}</p><h2>{t.mapTitle}</h2><p>{t.mapBody}</p><a className="button button--filled" href={mapHref} target="_blank" rel="noreferrer"><ExternalLink size={16} /> {t.mapAction}</a><p className="map-official">{t.mapOfficialNote} <a href={govTourismUrl} target="_blank" rel="noopener noreferrer">{t.mapOfficialLink} <ArrowUpRight size={13} /></a></p></div><div className="map-frame"><iframe title={locale === "id" ? "Peta lokasi Menara Keagungan Limboto (Limboto Tower)" : "Location map of Menara Keagungan Limboto (Limboto Tower)"} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6898.647756960036!2d122.97988821243553!3d0.6269983993642414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32792b4799e5e75d%3A0xc05565aafae3154e!2sLimboto%20Tower!5e1!3m2!1sid!2sid!4v1787144975728!5m2!1sid!2sid" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></div>
        </section>

        <section id="faq" className="content-section content-section--faq">
          <div className="section-rail"><span>{t.faqKicker}</span><div /></div>
          <div className="faq-layout"><div><p className="section-kicker">{t.faqKicker}</p><h2>{t.faqTitle}</h2></div><div className="faq-list">{t.faq.map((item, index) => <details key={item.q}><summary><span>0{index + 1}</span>{item.q}<ChevronDown size={19} /></summary><p>{item.a}</p></details>)}</div></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top"><div className="footer-brand"><img src={mark} alt="" /><div><h2>{t.footerTitle}</h2><p>{t.footerStatement}</p></div></div><div className="footer-links"><a href={govTourismUrl} target="_blank" rel="noopener noreferrer">{t.officialFooter} <ArrowUpRight size={12} /></a><a href={locale === "en" ? "/en/privacy/" : "/privacy/"}>{t.privacy}</a><a href={locale === "en" ? "/en/terms/" : "/terms/"}>{t.terms}</a><a href={locale === "en" ? "/en/cookies/" : "/cookies/"}>{t.cookies}</a></div></div>
        <div className="footer-bottom"><p>{t.footerSources}</p><p>{t.footerPhoto}</p><p>{t.copyright}</p></div>
      </footer>
    </div>
  );
}
