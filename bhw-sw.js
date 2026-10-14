const CACHE='ejuan-bhw-v6-5';
const FILES=['./bhw.html','./styles.css','./v6.css','./portal.css','./v6-data.js','./offline-store.js','./portal.js','./assets/MAINICON_EJUAN.svg','./assets/mascots/ejuanmascot_default.svg','./assets/mascots/ejuanmascot_happy.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('ejuan-bhw-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
// Cache static tablet assets only. No API responses or personal records are cached.
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  const asset=FILES.find(file=>{const cached=new URL(file,self.location.href);return cached.origin===url.origin&&cached.pathname===url.pathname;});
  if(event.request.method!=='GET'||!asset)return;
  event.respondWith(fetch(event.request).catch(()=>caches.match(new URL(asset,self.location.href).href).then(response=>response||Response.error())));
});
