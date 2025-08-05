// Service Worker para FriendsPartyServer PWA
// Versión 1.1 - 2025

const CACHE_NAME = 'friendspartyserver-v1.1';
const STATIC_CACHE = 'static-v1.1';
const DYNAMIC_CACHE = 'dynamic-v1.1';

// Recursos críticos para cachear
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/pages/core/servers.html',
    '/pages/core/eventos.html',
    '/pages/core/calculadora.html',
    '/pages/core/reglamento.html',
    '/pages/info/redes.html',
    '/pages/info/about.html',
    '/pages/info/contact.html',
    '/assets/css/main.css',
    '/assets/js/analytics.js',
    '/manifest.json',
    '/assets/images/Logo-FriendsPartyServerSR.webp',
    '/assets/images/logo-principal.png',
    'https://cdn.tailwindcss.com'
];

// URLs que siempre deben ir a la red (APIs, contenido dinámico)
const NETWORK_FIRST = [
    '/api/',
    '/live-timing',
    '/championships'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Cache failed', error);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Estrategia de caché
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Solo manejar requests HTTP/HTTPS
    if (!request.url.startsWith('http')) return;
    
    // Network First para APIs y contenido dinámico
    if (NETWORK_FIRST.some(pattern => url.pathname.includes(pattern))) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Cache First para assets estáticos
    if (request.destination === 'image' || 
        request.destination === 'style' || 
        request.destination === 'script' ||
        request.destination === 'font') {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Stale While Revalidate para documentos HTML
    if (request.destination === 'document') {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }
    
    // Network First por defecto
    event.respondWith(networkFirst(request));
});

// Estrategia Cache First
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        
        // Cachear la respuesta si es exitosa
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Cache First failed:', error);
        
        // Retornar respuesta offline si existe
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Retornar página offline para documentos
        if (request.destination === 'document') {
            return caches.match('/offline.html');
        }
        
        throw error;
    }
}

// Estrategia Network First
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cachear respuestas exitosas
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Network First failed, trying cache:', error);
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

// Estrategia Stale While Revalidate
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    // Fetch en segundo plano para actualizar caché
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(error => {
        console.log('Background fetch failed:', error);
    });
    
    // Retornar caché inmediatamente si existe, sino esperar network
    return cachedResponse || fetchPromise;
}

// Limpiar caché dinámico cuando sea muy grande
async function cleanDynamicCache() {
    const cache = await caches.open(DYNAMIC_CACHE);
    const keys = await cache.keys();
    
    if (keys.length > 100) { // Límite de 100 items
        console.log('Service Worker: Cleaning dynamic cache');
        await cache.delete(keys[0]);
    }
}

// Notificaciones Push (para futuras funcionalidades)
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/assets/images/favicon.ico',
        badge: '/assets/images/badge.png',
        tag: 'fps-notification',
        requireInteraction: true,
        actions: [
            {
                action: 'view',
                title: 'Ver Evento'
            },
            {
                action: 'close',
                title: 'Cerrar'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Manejo de clicks en notificaciones
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/eventos.html')
        );
    }
});

// Background Sync para envío de datos offline
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            handleBackgroundSync()
        );
    }
});

async function handleBackgroundSync() {
    // Implementar lógica de sincronización
    console.log('Background sync triggered');
}

// Limpieza periódica de caché
setInterval(cleanDynamicCache, 1000 * 60 * 60); // Cada hora
