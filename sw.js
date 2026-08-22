// JetLagPal service worker.
//
// Goal: once someone has opened the app and viewed a region, the whole thing
// (shell, station/boundary data, map tiles they've panned over) keeps working
// with no signal — a tunnel, a train, a dead zone mid-game. Firestore's own
// IndexedDB persistence (enabled in index.html) already handles the live game
// data going offline; this worker only owns the static app itself.
//
// Bump CACHE_VERSION whenever shipping a change to any precached file so
// clients pick up the new copy instead of serving a stale one forever.
const CACHE_VERSION = 'v8';
const SHELL_CACHE = `jetlagpal-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `jetlagpal-runtime-${CACHE_VERSION}`;
const TILE_CACHE = `jetlagpal-tiles-${CACHE_VERSION}`;

// Everything needed to boot the app and see previously-loaded Birmingham/West
// Midlands station data with zero network.
const SHELL_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './mapData.js',
    './questions.js',
    './tutorial.js',
    './ui.js',
    './firebase-config.js',
    './manifest.json',
    './data/west_midlands_boundaries.json',
    './data/west_midlands_farezones.json',
    './data/west_midlands_pois.json',
    './data/west_midlands_transport.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
];

// Pinned-version CDN libraries — safe to cache-first forever since the URL
// itself encodes the version.
const CDN_HOSTS = new Set(['unpkg.com', 'www.gstatic.com']);
const TILE_HOST_SUFFIX = '.basemaps.cartocdn.com';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(SHELL_CACHE)
            // `cache: 'reload'` forces each precache fetch past the browser's
            // own HTTP cache. Without it a freshly-bumped CACHE_VERSION can
            // still enshrine a stale copy of a file — the HTTP cache serves
            // the old bytes, addAll stores them, and the new worker then hands
            // that out cache-first for as long as this version lives.
            .then((cache) => cache.addAll(SHELL_ASSETS.map((url) => new Request(url, { cache: 'reload' }))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    const keep = new Set([SHELL_CACHE, RUNTIME_CACHE, TILE_CACHE]);
    event.waitUntil(
        caches.keys()
            .then((names) => Promise.all(names.filter((n) => !keep.has(n)).map((n) => caches.delete(n))))
            .then(() => self.clients.claim())
    );
});

function cacheFirst(request, cacheName) {
    return caches.open(cacheName).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response && response.ok) cache.put(request, response.clone());
        return response;
    });
}

// Serves cache immediately if present, but still refreshes it in the
// background — used for map tiles, which change least often but where a
// slightly stale copy beats a blank grey square.
function staleWhileRevalidate(request, cacheName) {
    return caches.open(cacheName).then(async (cache) => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request).then((response) => {
            if (response && response.ok) cache.put(request, response.clone());
            return response;
        }).catch(() => cached);
        const result = await (cached || networkFetch);
        // Nothing cached and the network failed: hand back an empty tile
        // instead of letting respondWith() throw on an undefined response —
        // a blank square beats a broken map.
        return result || new Response(null, { status: 504, statusText: 'Offline' });
    });
}

// Leaflet round-robins CARTO's a/b/c/d subdomains for parallel loading —
// they're mirrors of the same tiles, but the Cache API keys on the full URL,
// so the same tile pans in and out of "cached" depending purely on which
// subdomain happened to serve it that time. That's what made offline
// coverage look zoom-dependent: a zoom level "worked" only if enough of its
// tiles happened to land on subdomains already seen. Caching (and looking
// up) under a subdomain-stripped key fixes that without touching the real
// request Leaflet makes, so parallel loading online is unaffected.
function tileCacheKey(request) {
    const url = new URL(request.url);
    url.hostname = 'tile' + TILE_HOST_SUFFIX;
    return url.toString();
}

function staleWhileRevalidateTile(request, cacheName) {
    const cacheKey = tileCacheKey(request);
    return caches.open(cacheName).then(async (cache) => {
        const cached = await cache.match(cacheKey);
        const networkFetch = fetch(request).then((response) => {
            if (response && response.ok) cache.put(cacheKey, response.clone());
            return response;
        }).catch(() => cached);
        const result = await (cached || networkFetch);
        return result || new Response(null, { status: 504, statusText: 'Offline' });
    });
}

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // Firestore/Overpass traffic: never intercept. Firestore has its own
    // offline queue, and Overpass responses are already cached by the app
    // itself (see CACHE_PREFIX handling in index.html).
    if (url.hostname.endsWith('googleapis.com') || url.hostname.includes('overpass')) return;

    // App navigations: try the network for a fresh shell, but fall back to
    // the cached one so a cold, fully-offline launch still opens the app.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request).catch(() => caches.match('./index.html'))
        );
        return;
    }

    if (url.hostname.endsWith(TILE_HOST_SUFFIX)) {
        event.respondWith(staleWhileRevalidateTile(request, TILE_CACHE));
        return;
    }

    if (url.origin === self.location.origin || CDN_HOSTS.has(url.hostname)) {
        event.respondWith(cacheFirst(request, url.origin === self.location.origin ? SHELL_CACHE : RUNTIME_CACHE));
    }
});

// Linked-room notifications (question asked / answered). The payload is
// whatever api/notify.js was given: { title, body, data: { roomId, url? } }.
// This is what lets a push actually wake the app even when it's fully
// closed — everything else in this file only helps once it's already open.
self.addEventListener('push', (event) => {
    let payload = {};
    try { payload = event.data ? event.data.json() : {}; } catch (e) { /* non-JSON push — ignore body, still show something */ }

    const title = payload.title || 'JetLagPal';
    const options = {
        body: payload.body || '',
        icon: './icons/icon-192.png',
        badge: './icons/icon-192.png',
        data: payload.data || {},
        tag: (payload.data && payload.data.tag) || undefined, // collapse repeats of the same question into one notification
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

// Tapping the notification should bring an already-open tab to the front
// rather than piling up duplicate windows — falls back to opening a new one
// only if nothing's open.
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const targetUrl = new URL('./index.html', self.location.href).href;
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
            for (const client of clients) {
                if (client.url.startsWith(new URL('./', self.location.href).href) && 'focus' in client) {
                    return client.focus();
                }
            }
            return self.clients.openWindow(targetUrl);
        })
    );
});
