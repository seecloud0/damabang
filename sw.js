// Damabang (담아방) Service Worker - v9.0.0 (PNG Icons & Store Ready)
const CACHE_NAME = 'damabang-v9.0.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=8',
  './storage.js?v=8',
  './mock-data.js?v=8',
  './app.js?v=8',
  './manifest.json?v=9',
  './icons/icon.svg?v=9',
  './icons/icon-192.png?v=9',
  './icons/icon-512.png?v=9',
  './icons/icon-512-maskable.png?v=9',
  './icons/screenshot-narrow.png?v=9',
  './icons/screenshot-wide.png?v=9'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
