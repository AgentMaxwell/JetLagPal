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
const CACHE_VERSION = 'v1';
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
            .then((cache) => cache.addAll(SHELL_ASSETS))
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
        return cached || networkFetch;
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
        event.respondWith(staleWhileRevalidate(request, TILE_CACHE));
        return;
    }

    if (url.origin === self.location.origin || CDN_HOSTS.has(url.hostname)) {
        event.respondWith(cacheFirst(request, url.origin === self.location.origin ? SHELL_CACHE : RUNTIME_CACHE));
    }
});
