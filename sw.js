const CACHE_VERSION = "xingtu-shudao-performance-v4";
const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/assets/index-CbLSGL4l.js",
  "/assets/index-CDZb9ZxE.css",
  "/assets/enhancements.js",
  "/assets/enhancements.css",
  "/assets/travel-station-viewer.css",
  "/images/sichuan-jiange-map.webp",
  "/images/huangshang-jiange-hero.webp"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) { return cache.addAll(SHELL_ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (key) {
          return key.startsWith("xingtu-shudao-") && key !== CACHE_VERSION;
        }).map(function (key) {
          return caches.delete(key);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(function (cache) { cache.put("/index.html", copy); });
          return response;
        })
        .catch(function () { return caches.match("/index.html"); })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        if (!response || response.status !== 200 || response.type === "opaque") return response;
        const destination = request.destination;
        if (["script", "style", "image", "audio"].includes(destination) || /\.(glb|wasm|json|webp|png|jpg|ogg|mp3)$/i.test(url.pathname)) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(function (cache) { cache.put(request, copy); });
        }
        return response;
      });
    })
  );
});
