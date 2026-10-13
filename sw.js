// MyTimer.io: retires the old service worker.
// Earlier versions of the site installed a service worker that could keep
// serving a cached copy of the old page. This replacement clears those caches,
// removes itself, and reloads open tabs so everyone gets the current site.
// Keep this file in the repo until a new PWA service worker replaces it.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    } catch (e) { }
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type: 'window' });
    windows.forEach(client => client.navigate(client.url));
  })());
});
