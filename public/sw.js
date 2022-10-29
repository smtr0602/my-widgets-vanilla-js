const param = '202210282200';

const staticCacheName = `static-v${param}`;
const staticCacheAssets = [
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/manifest.json',
  '/imgs/bg/morning.png',
  '/imgs/bg/afternoon.png',
  '/imgs/bg/evening.png',
  '/imgs/bg/night.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(staticCacheName);
        cache.addAll(staticCacheAssets);
      } catch (e) {
        console.log('Failed in adding to cache');
      }
    })()
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();
      // delete all old caches
      return Promise.all(
        cacheKeys
          .filter((key) => key !== staticCacheName)
          .map((key) => {
            caches.delete(key);
          })
      );
    })()
  );
});

self.addEventListener('fetch', (e) => {
  // skip if request is not made with http protocol
  if (!(e.request.url.indexOf('http') === 0)) return;
  e.respondWith(
    (async () => {
      try {
        const item = await caches.match(e.request);
        if (item) return item;
        const res = await fetch(e.request);
        return res;
      } catch (e) {
        console.log('Failed in cache interaction or data fetching');
      }
    })()
  );
});
