const CACHE_NAME = "v1";
const ASSETS = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/images/logo.png", // Убедитесь, что пути соответствуют реальной структуре файлов
];

// Установка Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
            .catch((err) => console.log("Ошибка кеширования:", err))
    );
});

// Перехват запросов
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
