self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('taskwave-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/wii.css',
                '/wii.js',
                '/icons/icon-192x192.png',
                '/icons/icon-512x512.png',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
                'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['taskwave-v1'];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
