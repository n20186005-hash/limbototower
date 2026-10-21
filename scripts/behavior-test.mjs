import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const module={exports:{}};
vm.runInNewContext(ts.transpileModule(readFileSync('worker.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{module,exports:module.exports,URL,Request,Response,Headers});
const worker=module.exports.default;
let assetCalls=0;
const env={ASSETS:{fetch:async request=>{
  assetCalls++;const path=new URL(request.url).pathname;
  if(path==='/404')return new Response(request.method==='HEAD'?null:'<meta name="robots" content="noindex, follow">error');
  if(path==='/en/privacy/')return new Response('policy');
  return new Response(request.method==='HEAD'?null:'missing',{status:404});
}}};
for(const u of ['http://limbototower.com/privacy/?q=seo%2Froute&x=1&x=2','https://www.limbototower.com/privacy/?q=seo%2Froute&x=1&x=2']){
  const r=await worker.fetch(new Request(u),env);assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://limbototower.com/privacy/?q=seo%2Froute&x=1&x=2');
}
let r=await worker.fetch(new Request('https://limbototower.com/cookies?q=1'),env);assert.equal(r.headers.get('location'),'https://limbototower.com/cookies/?q=1');assert.equal(assetCalls,0);
for(const path of ['/404','/404/','/404.html','/404.html/','/missing'])for(const method of ['GET','HEAD']){
  r=await worker.fetch(new Request('https://limbototower.com'+path+'?x=1',{method}),env);assert.equal(r.status,404);assert.match(r.headers.get('X-Robots-Tag'),/noindex/);
  if(method==='HEAD')assert.equal(await r.text(),'');else if(path.startsWith('/404'))assert.match(await r.text(),/noindex/);
}
assert.equal((await worker.fetch(new Request('https://limbototower.com/en/privacy/'),env)).status,200);
console.log('PASS actual Worker with mocked ASSETS: existing canonical/query/slash redirects, explicit error aliases and unknown GET/HEAD404/noindex, successful page.');
const code=readFileSync(process.env.CONSENT_FILE||'client/public/consent.js','utf8');
const KEY='limboto-cookie-preferences',ID='G-HXM22WWPKP';
function page({lang='en',shared=new Map(),session=new Map(),failures={},name=''}={}){
 const scripts=[],listeners={};
 const storage=(m,kind)=>({getItem(k){if(failures[kind+'Read'])throw Error('read');return m.get(k)||null},setItem(k,v){if(failures[kind+'Write'])throw Error('write');m.set(k,v)},removeItem(k){if(failures[kind+'Write']||failures[kind+'Remove'])throw Error('remove');m.delete(k)}});
 const c={name,localStorage:storage(shared,'local'),sessionStorage:storage(session,'session'),Event:class{constructor(type){this.type=type}},
  document:{documentElement:{lang},getElementById:id=>scripts.find(s=>s.id===id),createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}},
  addEventListener:(e,fn)=>(listeners[e]||=[]).push(fn),dispatchEvent:e=>(listeners[e.type]||[]).forEach(fn=>fn(e))};
 c.window=c;vm.createContext(c);vm.runInContext(code,c);
 return {c,shared,session,failures,scripts,allowed:()=>c.limbotoConsent.read()?.analytics===true,save:v=>c.limbotoConsent.save(v),runtime:()=>c.dataLayer?.filter(a=>a[0]==='consent').at(-1)?.[2].analytics_storage,reload:()=>page({lang,shared,session,failures,name:c.name}),storageEvent:value=>(listeners.storage||[]).forEach(fn=>fn({key:KEY,newValue:value}))};
}
for(const lang of ['id','en']){
 let p=page({lang});assert.equal(p.scripts.length,0);assert.equal(p.save(true),true);assert.equal(p.runtime(),'granted');p.save(false);assert.equal(p.runtime(),'denied');p.save(true);assert.equal(p.runtime(),'granted');assert.equal(p.scripts.length,1);
 for(const dualFail of [false,true]){
  p=page({lang,shared:new Map([[KEY,'{"analytics":true}']])});assert.equal(p.scripts.length,1);p.failures.localWrite=true;p.failures.sessionWrite=dualFail;
  assert.equal(p.save(false),false);assert.equal(p.allowed(),false);assert.equal(p.runtime(),'denied');assert.equal(p.c['ga-disable-'+ID],true);
  assert.match(p.c.limbotoConsent.message(),dualFail?/on this page|halaman ini/:/this tab|tab ini/);
  vm.runInContext(code,p.c);assert.equal(p.allowed(),false);assert.equal(p.scripts.length,1);
  if(!dualFail)assert.equal(p.reload().scripts.length,0);
 }
 for(const failure of ['sessionRead','localRead','localWrite','localRemove']){
  p=page({lang,shared:new Map([[KEY,'{"analytics":true}']]),failures:{[failure]:true}});assert.equal(p.scripts.length,0,failure);assert.equal(p.save(true),false,failure);assert.equal(p.scripts.length,0,failure);assert.equal(p.allowed(),false,failure);
 }
 const shared=new Map([[KEY,'{"analytics":false}']]),a=page({lang,shared}),b=page({lang,shared});
 a.save(false);a.failures.sessionRemove=true;assert.equal(a.save(true),false);assert.equal(JSON.parse(shared.get(KEY)).analytics,false);assert.equal(b.scripts.length,0);
 a.failures.sessionRemove=false;a.save(true);b.storageEvent(shared.get(KEY));assert.equal(b.runtime(),'granted');
 let uiAllowed=true,uiMessage='';b.c.addEventListener('limboto-consent-change',()=>{uiAllowed=b.allowed();uiMessage=b.c.limbotoConsent.message()});
 a.save(false);b.storageEvent(shared.get(KEY));assert.equal(b.runtime(),'denied');assert.equal(uiAllowed,false);assert.match(uiMessage,/rejected|ditolak/);
 a.save(true);b.storageEvent(shared.get(KEY));assert.equal(b.allowed(),false);assert.match(uiMessage,/this tab|tab ini/);b.save(true);assert.equal(b.runtime(),'granted');assert.equal(b.scripts.length,1);assert.equal(uiAllowed,true);
 p=page({lang,shared:new Map([[KEY,'broken']])});assert.equal(p.scripts.length,0);
 console.log(`${lang}: PASS default denial, loaded-library regrant, retained-document veto, old grant withdrawal with local/dual write failure, full reload session veto, independent local/session read failure, veto clear before shared grant, cross-tab runtime and UI-event updates, malformed preference`);
}
// Exercise the real cookie component handlers with a small hook fixture.
// This verifies draft reset after a refused grant or rejection, not browser layout.
const React=await import('react');
const jsx=await import('react/jsx-runtime');
let draft=false;
const reactFixture={...React,useState:()=>[draft,value=>{draft=value}],useEffect:()=>{}};
const contentModule={exports:{}};
vm.runInNewContext(ts.transpileModule(readFileSync('client/src/lib/siteContent.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{module:contentModule,exports:contentModule.exports});
const legalModule={exports:{}};
vm.runInNewContext(ts.transpileModule(readFileSync('client/src/components/LegalPage.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText,{module:legalModule,exports:legalModule.exports,require:name=>name==='react'?reactFixture:name==='react/jsx-runtime'?jsx:name==='@/lib/siteContent'?contentModule.exports:name==='@/components/LanguageToggle'?{LanguageToggle:()=>null}:name==='lucide-react'?{ArrowLeft:()=>null,Cookie:()=>null,ShieldCheck:()=>null,Scale:()=>null}:(()=>{throw Error(name)})()});
function nodes(node){if(!node||typeof node!=='object')return [];return [node,...[node.props?.children].flat(Infinity).flatMap(nodes)];}
for(const locale of ['en','id']){
 const props={kind:'cookies',locale,onLocaleToggle:()=>{},analyticsEnabled:false,onAnalyticsChange:()=>false};
 const render=()=>legalModule.exports.default(props);
 nodes(render()).find(n=>n.type==='input').props.onChange({target:{checked:true}});assert.equal(draft,true);
 nodes(render()).filter(n=>n.type==='button')[0].props.onClick();assert.equal(draft,false,'failed grant must reset checked draft');
 draft=true;nodes(render()).filter(n=>n.type==='button')[1].props.onClick();assert.equal(draft,false,'reject must reset a draft even if parent state was already false');
 props.onAnalyticsChange=value=>value;draft=true;nodes(render()).filter(n=>n.type==='button')[0].props.onClick();assert.equal(draft,true);
}
console.log('PASS actual React cookie handlers in hook fixture: failed grant and rejection reset draft; accepted grant remains checked in ID/EN. No browser/layout claim.');
