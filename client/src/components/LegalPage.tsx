/** Tropical Civic Atlas page: quiet legal reading space, using paper tones and a local guide voice. */
import React, { useEffect, useState } from "react";
import { ArrowLeft, Cookie, ShieldCheck, Scale } from "lucide-react";
import type { Locale } from "@/lib/siteContent";
import { copy, legalCopy } from "@/lib/siteContent";
import { LanguageToggle } from "@/components/LanguageToggle";

type LegalKind = "privacy" | "terms" | "cookies";

type LegalPageProps = {
  kind: LegalKind;
  locale: Locale;
  onLocaleToggle: () => void;
  analyticsEnabled: boolean;
  consentStatus?: string;
  onAnalyticsChange: (enabled: boolean) => boolean;
};

const icons = { privacy: ShieldCheck, terms: Scale, cookies: Cookie };

export default function LegalPage({ kind, locale, onLocaleToggle, analyticsEnabled, onAnalyticsChange, consentStatus = "" }: LegalPageProps) {
  const [draft, setDraft] = useState(analyticsEnabled);
  useEffect(() => setDraft(analyticsEnabled), [analyticsEnabled]);
  const t = copy[locale];
  const document = legalCopy[locale][kind];
  const Icon = icons[kind];

  return (
    <main className="legal-page">
      <header className="legal-header">
        <a href={locale === "en" ? "/en/" : "/"} className="legal-back"><ArrowLeft size={16} /> {t.legalBack}</a>
        <LanguageToggle locale={locale} onToggle={onLocaleToggle} label={t.language} shortLabel={t.languageShort} targetHref={locale === "id" ? `/en/${kind}/` : `/${kind}/`} />
      </header>
      <article className="legal-article">
        <div className="legal-stamp"><Icon size={25} strokeWidth={1.6} /></div>
        <p className="section-kicker">{siteSection(kind, locale)}</p>
        <h1>{document.title}</h1>
        <p className="legal-lead">{document.lead}</p>
        <div className="legal-rule" />
        {document.sections.map(([heading, body]) => (
          <section key={heading} className="legal-section">
            <h2>{heading}</h2>
            <p>{body}</p>
          </section>
        ))}
        {kind !== "terms" && <p><a href="https://developers.cloudflare.com/web-analytics/about/">{locale === "id" ? "Dokumentasi Cloudflare Web Analytics" : "Cloudflare Web Analytics documentation"}</a></p>}
        {kind === "cookies" && (
          <section className="cookie-panel" aria-labelledby="cookie-preferences-title">
            <h2 id="cookie-preferences-title">{locale === "id" ? "Pilihan Anda" : "Your choices"}</h2>
            <div className="cookie-row"><div><strong>{t.requiredCookie}</strong><span>{locale === "id" ? "Halaman dapat digunakan tanpa cookie analitik." : "Pages work without analytics cookies."}</span></div><span className="cookie-state">{locale === "id" ? "Aktif" : "Active"}</span></div>
            <label className="cookie-row cookie-row--toggle"><div><strong>{t.analyticsCookie}</strong><span>{locale === "id" ? "Pengukuran penggunaan setelah persetujuan." : "Usage measurement after consent."}</span></div><input aria-label={t.analyticsCookie} type="checkbox" checked={draft} onChange={(event) => setDraft(event.target.checked)} /></label>
            <div className="cookie-row"><div><strong>{t.preferenceCookie}</strong><span>{locale === "id" ? "Menyimpan pilihan analitik bila tersedia." : "Stores analytics choices where available."}</span></div><span className="cookie-state">{locale === "id" ? "Lokal" : "Local"}</span></div>
            <div className="cookie-row"><div><strong>{t.marketingCookie}</strong><span>{locale === "id" ? "Tidak digunakan oleh situs ini." : "Not used by this site."}</span></div><span className="cookie-state">—</span></div>
            <div className="cookie-actions"><button className="button button--filled" type="button" onClick={() => setDraft(onAnalyticsChange(draft))}>{t.savePreferences}</button><button className="button button--quiet" type="button" onClick={() => setDraft(onAnalyticsChange(false))}>{t.rejectAll}</button></div>
          <p role="status">{consentStatus}</p></section>
        )}
      </article>
      <footer className="legal-footer"><p>{t.footerStatement}</p><nav className="footer-links">{(["privacy", "terms", "cookies"] as const).map(page => <a key={page} href={`${locale === "en" ? "/en" : ""}/${page}/`}>{t[page]}</a>)}</nav></footer>
    </main>
  );
}

function siteSection(kind: LegalKind, locale: Locale) {
  const labels = locale === "id" ? { privacy: "Prinsip data", terms: "Penggunaan situs", cookies: "Kontrol browser" } : { privacy: "Data principles", terms: "Site use", cookies: "Browser controls" };
  return labels[kind];
}
