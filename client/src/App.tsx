import React, {useEffect,useState} from 'react';
import Home from '@/pages/Home';
import LegalPage from '@/components/LegalPage';
import NotFound from '@/pages/NotFound';
declare global { interface Window { limbotoConsent?: {read:()=>{analytics:boolean}|null;save:(value:boolean)=>boolean;message:()=>string}; } }
export default function App(){
 const pathname=window.location.pathname.replace(/\/$/,'')||'/';const locale=pathname==='/en'||pathname.startsWith('/en/')?'en':'id';
 const topic=pathname.replace(/^\/en/,'').replace(/^\//,'');const [analytics,setAnalytics]=useState(false),[status,setStatus]=useState('');
 useEffect(()=>{const sync=()=>{setAnalytics(window.limbotoConsent?.read()?.analytics===true);setStatus(window.limbotoConsent?.message()||'')};sync();window.addEventListener('limboto-consent-change',sync);return()=>window.removeEventListener('limboto-consent-change',sync)},[]);
 const toggle=()=>{window.location.href=(locale==='id'?'/en':'')+(topic?`/${topic}/`:'/')};
 const choose=(value:boolean)=>{window.limbotoConsent?.save(value);setAnalytics(window.limbotoConsent?.read()?.analytics===true);setStatus(window.limbotoConsent?.message()||'');return window.limbotoConsent?.read()?.analytics===true;};
 if(!topic)return <Home locale={locale} onLocaleToggle={toggle}/>;
 if(topic==='privacy'||topic==='terms'||topic==='cookies')return <LegalPage kind={topic} locale={locale} onLocaleToggle={toggle} analyticsEnabled={analytics} onAnalyticsChange={choose} consentStatus={status}/>;
 return <NotFound/>;
}
