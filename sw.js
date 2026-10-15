const CACHE_NAME = 'cat-living-room-v1';
const CORE_FILES = ['./', './index.html', './manifest.webmanifest'];
const REMOTE_FILES = [
  'https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js',
  'https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/geometries/RoundedBoxGeometry.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_FILES);
    // These requests use CORS; caching the exact URLs keeps ES modules available offline.
    for (const url of REMOTE_FILES) {
      const response = await fetch(url, { mode: 'cors', cache: 'reload' });
      if (!response.ok) throw new Error('No se pudo guardar la dependencia: ' + url);
      await cache.put(url, response.clone());
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('cat-living-room-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isApp = url.origin === self.location.origin;
  const isPinnedDependency = REMOTE_FILES.includes(event.request.url);
  if (!isApp && !isPinnedDependency) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request, { ignoreSearch: false });
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response && response.ok) await cache.put(event.request, response.clone());
      return response;
    } catch (error) {
      if (isApp) {
        const fallback = await cache.match('./index.html');
        if (fallback) return fallback;
      }
      throw error;
    }
  })());
});
