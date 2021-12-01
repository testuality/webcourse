console.log("service worker step 1");


self.importScripts('data/games.js');

console.log("service worker step 2");

const cacheName = 'js13kPWA-v3';
const appShellFiles = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/favicon.ico',
  '/logo.png',
  '/data/games.js',
  '/sw.js',
'/icons/apple-icon-180.png',
'/icons/apple-splash-1125-2436.jpg',
'/icons/apple-splash-1136-640.jpg',
'/icons/apple-splash-1170-2532.jpg',
'/icons/apple-splash-1242-2208.jpg',
'/icons/apple-splash-1242-2688.jpg',
'/icons/apple-splash-1284-2778.jpg',
'/icons/apple-splash-1334-750.jpg',
'/icons/apple-splash-1536-2048.jpg',
'/icons/apple-splash-1620-2160.jpg',
'/icons/apple-splash-1668-2224.jpg',
'/icons/apple-splash-1668-2388.jpg',
'/icons/apple-splash-1792-828.jpg',
'/icons/apple-splash-2048-1536.jpg',
'/icons/apple-splash-2048-2732.jpg',
'/icons/apple-splash-2160-1620.jpg',
'/icons/apple-splash-2208-1242.jpg',
'/icons/apple-splash-2224-1668.jpg',
'/icons/apple-splash-2388-1668.jpg',
'/icons/apple-splash-2436-1125.jpg',
'/icons/apple-splash-2532-1170.jpg',
'/icons/apple-splash-2688-1242.jpg',
'/icons/apple-splash-2732-2048.jpg',
'/icons/apple-splash-640-1136.jpg',
'/icons/apple-splash-750-1334.jpg',
'/icons/apple-splash-828-1792.jpg',
'/icons/manifest-icon-512.maskable.png'
];
const gamesImages = [];
for (let i = 0; i < games.length; i++) {
  gamesImages.push(`data/img/${games[i].slug}.png`);
}
const contentToCache = appShellFiles.concat(gamesImages);

console.log("service worker step 3 ", contentToCache);

try {

    // self.addEventListener('install', (e) => {
    //    console.log('[Service Worker] Install');
    //    e.waitUntil((async () => {
    //    const cache = await caches.open(cacheName);
    //    console.log('[Service Worker] Caching all: app shell and content');
    //    await cache.addAll(contentToCache);
    //    })());
    //});

    self.addEventListener('install', function(event) {
        event.waitUntil(  
          caches.open(cacheName).then(function(cache) {
            return cache.addAll(contentToCache);
          }).catch(err => {
              console.error("Error addAll", err);
          })
        );
      });
}
catch (err) {
    console.error("Install error", err);
}

console.log("service worker step 4");

try {
  self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  });  
}
catch (err) {
    console.error("Fetch error", err);
}

  console.log("service worker step 5");

try {

    // Delete old caches
self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key === cacheName) { return; }
        return caches.delete(key);
      }))
    }));
  });
}
catch (e) {
    console.error("Activate error", e);
}

  console.log("service worker step 6");
