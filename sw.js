// ─── English Kids Service Worker v3 ─────────────────────────────
const CACHE = 'english-kids-v8';

const PRECACHE = [
  './',
  './index.html',
  './data.js',
  './data-pequeworld.js',
  './components.jsx',
  './screens-home.jsx',
  './screens-learn.jsx',
  './screens-duo.jsx',
  './screens-songs.jsx',
  './screens-profiles.jsx',
  './screens-pequeworld-shared.jsx',
  './screens-pequeworld.jsx',
  './screens-pequeworld-leer.jsx',
  './screens-launcher.jsx',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap',
  'https://unpkg.com/react@18.3.1/umd/react.development.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js',
];

// Install: pre-cache all app shell files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      // Cache what we can, ignore failures for CDN resources
      return Promise.allSettled(
        PRECACHE.map(url => cache.add(url).catch(() => {}))
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: red primero para el HTML (así nunca se queda pillado en una
// versión vieja aunque el Service Worker tarde en actualizarse),
// cache-first para el resto del app shell, network-first para Twemoji.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Documento principal (navegación / index.html): red primero,
  // caché solo como último recurso si no hay conexión.
  if (event.request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request).then(c => c || caches.match('./index.html')))
    );
    return;
  }

  // Twemoji images: network first, fallback to cache
  if (url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Google Fonts: network first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Everything else: cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
