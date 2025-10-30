const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE_NAME = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE_NAME = `images-${CACHE_VERSION}`;
const MAX_DYNAMIC_ITEMS = 50;
const MAX_IMAGE_ITEMS = 30;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg',
  '/robots.txt',
];

const CACHE_STRATEGIES = {
  static: [
    /\.js$/,
    /\.css$/,
    /\.woff2?$/,
    /\.ttf$/,
    /\.otf$/,
  ],
  images: [
    /\.png$/,
    /\.jpg$/,
    /\.jpeg$/,
    /\.svg$/,
    /\.gif$/,
    /\.webp$/,
  ],
  networkFirst: [
    /\/api\//,
    /\.json$/,
  ],
};

const limitCacheSize = (cacheName, maxItems) => {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxItems));
      }
    });
  });
};

const matchesCacheStrategy = (url, patterns) => {
  return patterns.some(pattern => pattern.test(url));
};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => {
              return name.startsWith('static-') || 
                     name.startsWith('dynamic-') || 
                     name.startsWith('images-');
            })
            .filter(name => {
              return name !== STATIC_CACHE_NAME &&
                     name !== DYNAMIC_CACHE_NAME &&
                     name !== IMAGE_CACHE_NAME;
            })
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  if (url.origin !== location.origin && !url.href.includes('fonts.googleapis.com')) {
    return;
  }

  if (matchesCacheStrategy(url.pathname, CACHE_STRATEGIES.images)) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response;
        }
        return fetch(request).then(fetchResponse => {
          return caches.open(IMAGE_CACHE_NAME).then(cache => {
            cache.put(request, fetchResponse.clone());
            limitCacheSize(IMAGE_CACHE_NAME, MAX_IMAGE_ITEMS);
            return fetchResponse;
          });
        });
      }).catch(() => {
        return new Response('Image not available', {
          status: 404,
          statusText: 'Not Found'
        });
      })
    );
    return;
  }

  if (matchesCacheStrategy(url.pathname, CACHE_STRATEGIES.static)) {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(fetchResponse => {
          return caches.open(STATIC_CACHE_NAME).then(cache => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      }).catch(() => {
        return caches.match('/index.html');
      })
    );
    return;
  }

  if (matchesCacheStrategy(url.pathname, CACHE_STRATEGIES.networkFirst)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            cache.put(request, response.clone());
            limitCacheSize(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_ITEMS);
            return response;
          });
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(request).then(fetchResponse => {
          return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            cache.put(request, fetchResponse.clone());
            limitCacheSize(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_ITEMS);
            return fetchResponse;
          });
        });
      })
      .catch(() => {
        if (request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(name => caches.delete(name))
        );
      })
    );
  }
});
