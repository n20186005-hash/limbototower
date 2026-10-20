import React, {useEffect,useState} from 'react';
import Home from '@/pages/Home';
import LegalPage from '@/components/LegalPage';
import NotFound from '@/pages/NotFound';
declare global { interface Window { limbotoConsent?: {read:()=>{analytics:boolean}|null;save:(value:boolean)=>boolean}; } }
export default function App(){
 const pathname=window.location.pathname.replace(/\/$/,'')||'/';const locale=pathname==='/en'||pathname.startsWith('/en/')?'en':'id';
 const topic=pathname.replace(/^\/en/,'').replace(/^\//,'');const [analytics,setAnalytics]=useState(false),[status,setStatus]=useState('');
 useEffect(()=>{setAnalytics(window.limbotoConsent?.read()?.analytics===true)},[]);
 const toggle=()=>{window.location.href=(locale==='id'?'/en':'')+(topic?`/${topic}/`:'/')};
 const choose=(value:boolean)=>{const stored=window.limbotoConsent?.save(value)===true;setAnalytics(value);setStatus(locale==='id'?(stored?'Pilihan disimpan.':value?'Analitik diizinkan pada halaman ini; pilihan tidak dapat disimpan.':'Analitik ditolak sekarang; pilihan tidak dapat disimpan untuk tab/browser baru.'):(stored?'Choice saved.':value?'Analytics allowed on this page; the choice could not be saved.':'Analytics refused now; the choice could not be saved for new tabs/browsers.'));};
 if(!topic)return <Home locale={locale} onLocaleToggle={toggle}/>;
 if(topic==='privacy'||topic==='terms'||topic==='cookies')return <LegalPage kind={topic} locale={locale} onLocaleToggle={toggle} analyticsEnabled={analytics} onAnalyticsChange={choose} consentStatus={status}/>;
 return <NotFound/>;
}
