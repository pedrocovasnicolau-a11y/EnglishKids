// ─── English Kids Service Worker v3 ─────────────────────────────
const CACHE = 'english-kids-v9';

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

// Contenido propio de PequeWorld. Sin precachearlo, la primera vez que
// se abre la app sin red no hay fotos ni sonidos de animales: justo el
// contenido por el que un niño de 3 años entra en la sección.
const PRECACHE_ASSETS = [
  './assets/pequeworld/img/animal_caballo.jpg',
  './assets/pequeworld/img/animal_cerdo.jpg',
  './assets/pequeworld/img/animal_gallina.jpg',
  './assets/pequeworld/img/animal_gato.jpg',
  './assets/pequeworld/img/animal_oveja.jpg',
  './assets/pequeworld/img/animal_pato.jpg',
  './assets/pequeworld/img/animal_perro.jpg',
  './assets/pequeworld/img/animal_vaca.jpg',
  './assets/pequeworld/img/emocion_con_miedo.jpg',
  './assets/pequeworld/img/emocion_enfadado.jpg',
  './assets/pequeworld/img/emocion_feliz.jpg',
  './assets/pequeworld/img/emocion_sorprendido.jpg',
  './assets/pequeworld/img/emocion_tranquilo.jpg',
  './assets/pequeworld/img/emocion_triste.jpg',
  './assets/pequeworld/img/rutina_banarse.jpg',
  './assets/pequeworld/img/rutina_desayunar.jpg',
  './assets/pequeworld/img/rutina_despertarse.jpg',
  './assets/pequeworld/img/rutina_dientes.jpg',
  './assets/pequeworld/img/rutina_dormir.jpg',
  './assets/pequeworld/img/rutina_jugar.jpg',
  './assets/pequeworld/img/rutina_vestirse.jpg',
  './assets/pequeworld/audio/animals/sonido_caballo.mp3',
  './assets/pequeworld/audio/animals/sonido_cerdo.mp3',
  './assets/pequeworld/audio/animals/sonido_gallina.mp3',
  './assets/pequeworld/audio/animals/sonido_gato.mp3',
  './assets/pequeworld/audio/animals/sonido_oveja.mp3',
  './assets/pequeworld/audio/animals/sonido_pato.mp3',
  './assets/pequeworld/audio/animals/sonido_perro.mp3',
  './assets/pequeworld/audio/animals/sonido_vaca.mp3',
  './assets/pequeworld/audio/music/fondo1.mp3',
  './assets/pequeworld/audio/music/fondo2.mp3',
  './assets/pequeworld/audio/music/fondo3.mp3',
  './assets/pequeworld/audio/music/fondo4.mp3',
  './assets/pequeworld/audio/music/fondo6.mp3',
];

// Install: pre-cache all app shell files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      // Cache what we can, ignore failures for CDN resources
      return Promise.allSettled(
        [...PRECACHE, ...PRECACHE_ASSETS].map(url => cache.add(url).catch(() => {}))
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
      }).catch(() => {
        // Solo tiene sentido devolver el HTML si se pedía un documento.
        // Devolverlo para una imagen o un mp3 hacía que el navegador
        // recibiera HTML donde esperaba binario.
        if (event.request.destination === 'document' || event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
