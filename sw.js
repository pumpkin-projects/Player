const C="moonlit-v5";
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
const CDN="https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js";
self.addEventListener("install",e=>{e.waitUntil((async()=>{const c=await caches.open(C);await c.addAll(ASSETS);try{await c.put(CDN,await fetch(CDN,{mode:"no-cors"}))}catch(_){}})());self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>e.request.mode==="navigate"?caches.match("./index.html"):Response.error())));
});
