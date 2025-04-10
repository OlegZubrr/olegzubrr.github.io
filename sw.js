self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    if (url.pathname.startsWith("/source/")) {
        event.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                try {
                    const fetchResponse = await fetch(event.request);

                    if (
                        !fetchResponse ||
                        fetchResponse.status !== 200 ||
                        fetchResponse.type === "opaque"
                    ) {
                        console.warn(
                            "Fetch failed or not cacheable",
                            fetchResponse
                        );
                        const cachedResponse = await cache.match(event.request);
                        return (
                            cachedResponse ||
                            new Response(null, { status: 404 })
                        );
                    }

                    const responseToCache = fetchResponse.clone();
                    cache.put(event.request, responseToCache);

                    return fetchResponse;
                } catch (error) {
                    console.error("Fetch error in ServiceWorker:", error);
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
