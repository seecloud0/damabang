// Damabang (담아방) Service Worker - v10.0.0 (Web Share Target & Smart Analyzer)
const CACHE_NAME = 'damabang-v10.0.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=10',
  './storage.js?v=10',
  './mock-data.js?v=10',
  './app.js?v=10',
  './manifest.json?v=10',
  './icons/icon.svg?v=10',
  './icons/icon-192.png?v=10',
  './icons/icon-512.png?v=10',
  './icons/icon-512-maskable.png?v=10',
  './icons/screenshot-narrow.png?v=10',
  './icons/screenshot-wide.png?v=10'
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
