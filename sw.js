// Service Worker for Texna PWA
const CACHE_NAME = 'texna-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/products.html',
    '/services.html',
    '/about.html',
    '/search.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/SVG/Texna Logo.svg',
    '/01.webp',
    '/02.webp',
    '/03.webp',
    '/04.webp',
    '/Map.webp'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('❌ Cache failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                if (response) {
                    console.log('📋 Serving from cache:', event.request.url);
                    return response;
                }
                
                console.log('🌐 Fetching from network:', event.request.url);
                return fetch(event.request).then((response) => {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response
                    const responseToCache = response.clone();
                    
                    // Add to cache for future use
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
            .catch(() => {
                // Fallback for offline scenarios
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('🔄 Background sync triggered');
        // Handle background sync tasks
    }
});

// Push notifications (for future use)
self.addEventListener('push', (event) => {
    console.log('📱 Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update from Texna',
        icon: '/SVG/Texna Logo.svg',
        badge: '/SVG/Texna Logo.svg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Products',
                icon: '/SVG/Texna Logo.svg'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/SVG/Texna Logo.svg'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Texna', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/products.html')
        );
    } else {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});