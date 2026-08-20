/** Tropical Civic Atlas shell: content-first local guide routes with persistent language and privacy choices. */
import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import LegalPage from "@/components/LegalPage";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import type { Locale } from "@/lib/siteContent";

declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; } }

function Router({ locale, onLocaleToggle, analyticsEnabled, onAnalyticsChange }: { locale: Locale; onLocaleToggle: () => void; analyticsEnabled: boolean; onAnalyticsChange: (enabled: boolean) => void }) {
  const legalProps = { locale, onLocaleToggle, analyticsEnabled, onAnalyticsChange };
  return <Switch>
    <Route path="/">{() => <Home locale={locale} onLocaleToggle={onLocaleToggle} />}</Route>
    <Route path="/privacy" component={() => <LegalPage kind="privacy" {...legalProps} />} />
    <Route path="/terms" component={() => <LegalPage kind="terms" {...legalProps} />} />
    <Route path="/cookies" component={() => <LegalPage kind="cookies" {...legalProps} />} />
    <Route component={NotFound} />
  </Switch>;
}

function App() {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem("limboto-locale") as Locale) || "id");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => localStorage.getItem("limboto-analytics") === "true");
  const toggleLocale = () => setLocale((current) => current === "id" ? "en" : "id");
  const updateAnalytics = (enabled: boolean) => setAnalyticsEnabled(enabled);

  useEffect(() => { localStorage.setItem("limboto-locale", locale); }, [locale]);
  useEffect(() => {
    localStorage.setItem("limboto-analytics", String(analyticsEnabled));
    if (!analyticsEnabled || document.querySelector("script[data-ga4]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.dataset.ga4 = "true";
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP";
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => { window.dataLayer?.push(args); };
    window.gtag("js", new Date());
    window.gtag("config", "G-HXM22WWPKP");
  }, [analyticsEnabled]);

  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router locale={locale} onLocaleToggle={toggleLocale} analyticsEnabled={analyticsEnabled} onAnalyticsChange={updateAnalytics} /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
