// Retire the previous offline shell; navigation must retain real network status.
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("limboto-")).map(k=>caches.delete(k)))).then(()=>self.registration.unregister())));
