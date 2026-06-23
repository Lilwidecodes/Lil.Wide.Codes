/* SERVICE WORKER - Lil.Wide.Codes Hub V3 | Purpose: Offline caching (PWA) */

const CACHE_NAME = 'lilwidecodes-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/base.css',
  './assets/css/layout.css',
  './assets/css/components.css',
  './assets/css/theme.css',
  './assets/js/navigation.js',
  './assets/js/main.js',
  './pages/about.html',
  './pages/projects.html',
  './pages/case-studies.html',
  './pages/learn.html',
  './pages/contact.html',
  './pages/roadmap.html',
  './pages/vision.html',
  './pages/products.html',
  './pages/downloads.html',
  './pages/documentation.html',
  './pages/learn/web-foundations.html',
  './pages/learn/ui-layout-systems.html',
  './pages/learn/javascript-systems.html',
  './data/cheat-sheet.md'
];

// Perform install cache registration
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Clear older caches on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Intercept fetch streams to check cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request)
          .then((response) => {
            // Check for valid response status
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Dynamically cache new fetched requests
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // Offline fallback if not cached
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('./index.html');
            }
          });
      })
  );
});
