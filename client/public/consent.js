(() => {
  const KEY='limboto-cookie-preferences', DENY='limboto-analytics-denied', MARK='|limboto-analytics-denied|', ID='G-HXM22WWPKP';
  const en=document.documentElement.lang==='en';
  const messages=en?{
    on:'Google Analytics allowed in this browser.',off:'Google Analytics rejected in this browser.',
    tab:'Google Analytics is off for this tab, including navigation and refresh. The permanent choice could not be saved; an older grant may remain in other tabs. Clear site data in browser settings to remove stored permission.',
    page:'Google Analytics is off on this page. Storage is unavailable; clear site data in browser settings before navigating or refreshing.',
    retained:'Google Analytics remains off in this tab. Save an allowed choice here to enable it.'
  }:{
    on:'Google Analytics diizinkan pada browser ini.',off:'Google Analytics ditolak pada browser ini.',
    tab:'Google Analytics nonaktif untuk tab ini, termasuk navigasi dan pemuatan ulang. Pilihan permanen gagal disimpan; izin lama mungkin masih ada di tab lain. Hapus data situs melalui pengaturan browser untuk menarik izin tersimpan.',
    page:'Google Analytics nonaktif pada halaman ini. Penyimpanan tidak tersedia; hapus data situs melalui pengaturan browser sebelum navigasi atau pemuatan ulang.',
    retained:'Google Analytics tetap nonaktif pada tab ini. Simpan pilihan izin di sini untuk mengaktifkannya.'
  };
  let lastMessage='';
  function denied(){
    if(window.__limbotoDenied)return true;
    try{if(sessionStorage.getItem(DENY)==='1')return true;}catch{return true;}
    try{return window.name.includes(MARK);}catch{return true;}
  }
  function markDeny(){
    window.__limbotoDenied=true;let sessionSaved=false;
    try{sessionStorage.setItem(DENY,'1');sessionSaved=sessionStorage.getItem(DENY)==='1';}catch{}
    try{window.name=window.name.split(MARK).join('')+MARK;}catch{}
    return sessionSaved;
  }
  function read(){
    if(denied())return null;
    try{
      const saved=JSON.parse(localStorage.getItem(KEY)||'null');
      // A stale stored grant must not revive while writes are blocked.
      localStorage.setItem(KEY+'-write-check','1');localStorage.removeItem(KEY+'-write-check');
      return saved && typeof saved.analytics==='boolean'?saved:null;
    }catch{return null;}
  }
  function apply(grant){
    window['ga-disable-'+ID]=!grant;
    if(!grant){window.gtag?.('consent','update',{analytics_storage:'denied'});return;}
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    if(document.getElementById('limboto-ga4')){
      window.gtag('consent','update',{analytics_storage:'granted'});return;
    }
    window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent','update',{analytics_storage:'granted'});
    const script=document.createElement('script');script.id='limboto-ga4';script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(script);
    window.gtag('js',new Date());window.gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false});
  }
  function notify(){window.dispatchEvent(new Event('limboto-consent-change'));}
  function save(analytics){
    analytics=analytics===true;let stored=false,sessionSaved=false;
    if(!analytics){sessionSaved=markDeny();apply(false);}
    try{
      if(analytics){
        // Clear and verify tab vetoes before publishing a shared grant.
        sessionStorage.removeItem(DENY);
        if(sessionStorage.getItem(DENY)==='1')throw Error('Tab refusal remains');
        window.name=window.name.split(MARK).join('');
        if(window.name.includes(MARK))throw Error('Tab marker remains');
        localStorage.getItem(KEY);
        localStorage.setItem(KEY+'-write-check','1');localStorage.removeItem(KEY+'-write-check');
      }
      localStorage.setItem(KEY,JSON.stringify({analytics}));
      if(analytics)window.__limbotoDenied=false;
      stored=true;
    }catch{sessionSaved=markDeny()||sessionSaved;}
    const allowed=read()?.analytics===true;apply(allowed);
    lastMessage=stored?(allowed?messages.on:messages.off):(sessionSaved?messages.tab:messages.page);
    notify();return stored;
  }
  window.limbotoConsent={read,save,message:()=>lastMessage};
  apply(read()?.analytics===true);
  window.addEventListener('storage',event=>{
    if(event.key!==KEY&&event.key!==null)return;
    let granted=false;try{granted=JSON.parse(event.newValue||'null')?.analytics===true;}catch{}
    if(!granted)markDeny();
    const allowed=read()?.analytics===true;apply(allowed);
    lastMessage=allowed?messages.on:granted?messages.retained:messages.off;notify();
  });
})();
