const CACHE_NAME = "afritech-elite-v2";
const APP_SHELL = [
  "/",
  "/offline",
  "/hero-background.svg",
  "/pwa-192.png",
  "/pwa-512.png",
  "/apple-touch-icon.png",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith("afritech-elite-") && cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const cacheKey = new URL(requestUrl.pathname, self.location.origin);
            return caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(cacheKey, response.clone()))
              .then(() => response);
          }
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          return (
            (await cache.match(requestUrl.pathname)) ??
            (await cache.match("/")) ??
            (await cache.match("/offline"))
          );
        }),
    );
    return;
  }

  const isStaticAsset =
    requestUrl.pathname.startsWith("/_next/static/") ||
    requestUrl.pathname.startsWith("/pwa-") ||
    requestUrl.pathname === "/hero-background.svg" ||
    requestUrl.pathname === "/manifest.webmanifest";

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then(
        (cachedResponse) =>
          cachedResponse ??
          fetch(request).then((response) => {
            if (response.ok) {
              return caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(request, response.clone()))
                .then(() => response);
            }
            return response;
          }),
      ),
    );
  }
});
