// MyTimer.io Service Worker
const CACHE_NAME = 'mytimer-io-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png', 
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  // External resources
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg',
  'https://actions.google.com/sounds/v1/alarms/medium_bell_ringing_near.ogg',
  'https://actions.google.com/sounds/v1/alarms/beep_short.ogg',
  'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg',
  'https://actions.google.com/sounds/v1/alarms/notification_alert_chord.ogg'
];

// Install - Cache all files
self.addEventListener('install', (event) => {
  console.log('MyTimer.io: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('MyTimer.io: Caching files');
        return cache.addAll(urlsToCache.map(url => {
          return new Request(url, {mode: 'cors'});
        }));
      })
      .catch((error) => {
        console.log('MyTimer.io: Cache failed', error);
        return Promise.resolve();
      })
  );
  self.skipWaiting();
});

// Activate - Clean old cache
self.addEventListener('activate', (event) => {
  console.log('MyTimer.io: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('MyTimer.io: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: 'Your timer has completed!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'mytimer-notification',
    actions: [
      {
        action: 'view',
        title: 'Open MyTimer.io'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('MyTimer.io', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('https://mytimer.io')
    );
  }
});