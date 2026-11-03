/* 肌肉训练图谱 · application service worker
 * Keeps the inline app document available when the device is offline.
 */
const CACHE_NAME = "muscle-atlas-shell-v1";
const APP_SHELL = ["./", "./index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, copy.clone()).catch(() => {});
              cache.put("./index.html", copy).catch(() => {});
            });
          }
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          return (await cache.match(request))
            || (await cache.match("./index.html"))
            || (await cache.match("./"))
            || new Response(
              "<!DOCTYPE html><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'><body style='margin:0;display:grid;place-items:center;height:100vh;background:#f6f7f9;color:#1b1d22;font-family:system-ui;text-align:center'><div><p style='font:600 10px monospace;letter-spacing:.14em;color:#f15a32'>OFFLINE</p><h1 style='font-size:24px'>暂时无法连接网络</h1><p style='color:#707680;font-size:13px'>首次离线使用前，请联网打开一次应用。</p></div></body>",
              { headers: { "Content-Type": "text/html; charset=utf-8" } }
            );
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
        }
        return response;
      });
    })
  );
});
