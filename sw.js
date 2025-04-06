const CACHE_NAME = "v1";

self.addEventListener("install", (event) => {
    // Пропускаем этап предварительного кеширования
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Кешируем все запросы к папке /source/
    if (url.pathname.startsWith("/source/")) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    return (
                        response ||
                        fetch(event.request).then((fetchResponse) => {
                            cache.put(event.request, fetchResponse.clone());
                            return fetchResponse;
                        })
                    );
                });
            })
        );
    } else {
        // Для остальных запросов - стандартное поведение
        event.respondWith(fetch(event.request));
    }
});
