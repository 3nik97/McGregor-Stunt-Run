const C='stunt-v15-2';
const FILES=['./','index.html','three.min.js','GLTFLoader.js','car-model.js','car-base.jpg','car-interior.jpg','car-lights.jpg','car-wheels.jpg','manifest.json','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{ if(res && (res.ok||res.type==='opaque')){ const cp=res.clone(); caches.open(C).then(c=>c.put(e.request,cp)); } return res; }).catch(()=>new Response('',{status:504})))); });
