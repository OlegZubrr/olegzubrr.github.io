const CACHE_NAME = "v7"; // Обновите версию кэша

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cache) => {
                        if (cache !== CACHE_NAME) {
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .then(() => self.clients.claim()) // Активируем сразу для всех клиентов
    );
});

self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    if (url.pathname.startsWith("/source/")) {
        event.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                try {
                    // Первым делом пытаемся получить свежие данные из сети
                    const fetchResponse = await fetch(event.request);

                    // Проверяем валидность ответа
                    if (!fetchResponse || fetchResponse.status !== 200) {
                        return fetchResponse;
                    }

                    // Клонируем ответ для кэширования
                    const responseToCache = fetchResponse.clone();
                    cache.put(event.request, responseToCache);

                    return fetchResponse;
                } catch (error) {
                    // Если сеть недоступна - ищем в кэше
                    const cachedResponse = await cache.match(event.request);
                    return (
                        cachedResponse || new Response(null, { status: 404 })
                    );
                }
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});
