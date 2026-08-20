/** Tropical Civic Atlas component: compact bilingual control with civic-wayfinding clarity. */
import { Languages } from "lucide-react";
import type { Locale } from "@/lib/siteContent";

type LanguageToggleProps = {
  locale: Locale;
  onToggle: () => void;
  label: string;
  shortLabel: string;
};

export function LanguageToggle({ locale, onToggle, label, shortLabel }: LanguageToggleProps) {
  return (
    <button className="language-toggle" type="button" onClick={onToggle} aria-label={`Switch language to ${label}`}>
      <Languages size={15} strokeWidth={2.25} aria-hidden="true" />
      <span className="language-toggle__current">{locale === "id" ? "ID" : "EN"}</span>
      <span className="language-toggle__arrow">→</span>
      <span>{shortLabel}</span>
    </button>
  );
}
