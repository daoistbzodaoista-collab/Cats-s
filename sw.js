/* Offline shell cache for CAT — Living Room.
   Three.js and its addon are cached on first successful online load. */
const CACHE_NAME = 'cat-living-room-v2';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('cat-living-room-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Cache-first for app shell; stale-while-revalidate for module dependencies.
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(cache => cache.put(req, copy)); }
      return res;
    }).catch(() => caches.match('./index.html'))));
  } else if (url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(caches.match(req).then(hit => {
      const network = fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(cache => cache.put(req, copy)); } return res; });
      return hit || network;
    }));
  }
});
