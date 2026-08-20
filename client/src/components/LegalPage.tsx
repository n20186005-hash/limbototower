/** Tropical Civic Atlas page: quiet legal reading space, using paper tones and a local guide voice. */
import { ArrowLeft, Cookie, ShieldCheck, Scale } from "lucide-react";
import { Link } from "wouter";
import type { Locale } from "@/lib/siteContent";
import { copy, legalCopy } from "@/lib/siteContent";
import { LanguageToggle } from "@/components/LanguageToggle";

type LegalKind = "privacy" | "terms" | "cookies";

type LegalPageProps = {
  kind: LegalKind;
  locale: Locale;
  onLocaleToggle: () => void;
  analyticsEnabled: boolean;
  onAnalyticsChange: (enabled: boolean) => void;
};

const icons = { privacy: ShieldCheck, terms: Scale, cookies: Cookie };

export default function LegalPage({ kind, locale, onLocaleToggle, analyticsEnabled, onAnalyticsChange }: LegalPageProps) {
  const t = copy[locale];
  const document = legalCopy[locale][kind];
  const Icon = icons[kind];

  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link href="/" className="legal-back"><ArrowLeft size={16} /> {t.legalBack}</Link>
        <LanguageToggle locale={locale} onToggle={onLocaleToggle} label={t.language} shortLabel={t.languageShort} />
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
        {kind === "cookies" && (
          <section className="cookie-panel" aria-labelledby="cookie-preferences-title">
            <h2 id="cookie-preferences-title">{locale === "id" ? "Pilihan Anda" : "Your choices"}</h2>
            <div className="cookie-row"><div><strong>{t.requiredCookie}</strong><span>{locale === "id" ? "Selalu aktif untuk fungsi inti." : "Always active for core functions."}</span></div><span className="cookie-state">{locale === "id" ? "Aktif" : "Active"}</span></div>
            <label className="cookie-row cookie-row--toggle"><div><strong>{t.analyticsCookie}</strong><span>{locale === "id" ? "Membantu kami membaca penggunaan anonim." : "Helps us understand anonymous usage."}</span></div><input aria-label={t.analyticsCookie} type="checkbox" checked={analyticsEnabled} onChange={(event) => onAnalyticsChange(event.target.checked)} /></label>
            <div className="cookie-row"><div><strong>{t.preferenceCookie}</strong><span>{locale === "id" ? "Menyimpan bahasa yang Anda pilih." : "Stores the language you choose."}</span></div><span className="cookie-state">{locale === "id" ? "Lokal" : "Local"}</span></div>
            <div className="cookie-row"><div><strong>{t.marketingCookie}</strong><span>{locale === "id" ? "Tidak digunakan oleh situs ini." : "Not used by this site."}</span></div><span className="cookie-state">—</span></div>
            <div className="cookie-actions"><button className="button button--filled" type="button" onClick={() => onAnalyticsChange(analyticsEnabled)}>{t.savePreferences}</button><button className="button button--quiet" type="button" onClick={() => onAnalyticsChange(false)}>{t.rejectAll}</button></div>
          </section>
        )}
      </article>
      <footer className="legal-footer">{t.footerStatement}</footer>
    </main>
  );
}

function siteSection(kind: LegalKind, locale: Locale) {
  const labels = locale === "id" ? { privacy: "Prinsip data", terms: "Penggunaan situs", cookies: "Kontrol browser" } : { privacy: "Data principles", terms: "Site use", cookies: "Browser controls" };
  return labels[kind];
}
