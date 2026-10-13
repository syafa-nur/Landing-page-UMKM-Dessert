// Naikkan angka versi ini setiap kali kamu mengganti foto/kode agar cache lama dibuang.
const VERSION = "cwhee-v4";

const CORE = [
  "./",
  "index.html",
  "style.css",
  "script.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "images/hero-mochi.jpg",
  "images/about.jpg",
  "images/pilihan.jpg",
  "images/kotak.jpg",
  "images/kenyal.jpg",
  "images/order.jpg",
  "images/strawberry.jpg",
  "images/matcha.jpg",
  "images/coklat.jpg",
  "images/mangga.jpg",
  "images/oreo.jpg",
  "images/dubai-cwhee-cookie.jpg",
  "images/cwhee-cookies.jpg"
];

self.addEventListener("install", event => {
  // Satu file gagal (misalnya salah nama) tidak membatalkan yang lain
  event.waitUntil(
    caches.open(VERSION).then(cache =>
      Promise.all(CORE.map(url => cache.add(url).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Online: selalu ambil versi terbaru. Offline / sinyal buruk: pakai salinan tersimpan.
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith("http")) return;
  if (req.url.includes("wa.me")) return;
  if (req.url.endsWith(".mp4")) return; // video dikirim sebagian (206), tidak bisa di-cache
  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && (res.ok || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(VERSION).then(cache => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match("index.html")))
  );
});