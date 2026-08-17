// Damabang (담아방) Service Worker - v12.0.0 (Smart Auto-Fill & Preset Engine)
const CACHE_NAME = 'damabang-v12.0.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=12',
  './storage.js?v=12',
  './mock-data.js?v=12',
  './app.js?v=12',
  './manifest.json?v=12',
  './icons/icon.svg?v=12',
  './icons/icon-192.png?v=12',
  './icons/icon-512.png?v=12',
  './icons/icon-512-maskable.png?v=12',
  './icons/screenshot-narrow.png?v=12',
  './icons/screenshot-wide.png?v=12'
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

  const url = new URL(event.request.url);

  // Preserve Web Share Target GET requests by returning index.html shell
  if (url.searchParams.has('url') || url.searchParams.has('text') || url.searchParams.has('title')) {
    event.respondWith(
      caches.match('./index.html').then((cachedIndex) => {
        return cachedIndex || fetch(event.request);
      })
    );
    return;
  }

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
      .catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});
