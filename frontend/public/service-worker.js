const CACHE_NAME = 'prescripto-v1';
const RUNTIME_CACHE = 'prescripto-runtime';
const OFFLINE_QUEUE = 'offline-queue';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/vite.svg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    // For API calls, use network first with offline queue
    if (url.pathname.includes('/api/')) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Clone the response before caching
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
            return response;
          })
          .catch(async () => {
            // Try to get from cache
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
              return cachedResponse;
            }

            // If POST/PUT/DELETE, queue the request
            if (request.method !== 'GET') {
              return queueRequest(request);
            }

            // Return offline response
            return new Response(JSON.stringify({ 
              success: false, 
              message: 'You are offline. Please try again when connected.',
              offline: true
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          })
      );
      return;
    }
  }

  // For local assets, use cache first strategy
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // Don't cache if not a success response
            if (!response || response.status !== 200) {
              return response;
            }

            // Clone the response
            const responseClone = response.clone();

            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });

            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            return new Response('Network error', { status: 503 });
          });
      })
  );
});

// Queue request for when online
async function queueRequest(request) {
  try {
    const requestClone = request.clone();
    const requestData = {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries([...request.headers.entries()]),
      body: await requestClone.text(),
      timestamp: Date.now()
    };

    // Store in IndexedDB (simplified version using localStorage here)
    const queue = await getOfflineQueue();
    queue.push(requestData);
    await saveOfflineQueue(queue);

    return new Response(JSON.stringify({ 
      success: false, 
      message: 'You are offline. This request will be processed when you are back online.',
      queued: true
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error queueing request:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Failed to queue request',
      error: true
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}

// Get offline queue from IndexedDB
async function getOfflineQueue() {
  try {
    const cache = await caches.open(OFFLINE_QUEUE);
    const response = await cache.match('queue');
    if (response) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error getting offline queue:', error);
    return [];
  }
}

// Save offline queue to IndexedDB
async function saveOfflineQueue(queue) {
  try {
    const cache = await caches.open(OFFLINE_QUEUE);
    await cache.put('queue', new Response(JSON.stringify(queue), {
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error) {
    console.error('Error saving offline queue:', error);
  }
}

// Process queued requests when back online
async function processOfflineQueue() {
  const queue = await getOfflineQueue();
  if (queue.length === 0) return;

  console.log('Processing offline queue:', queue.length, 'requests');
  const processedQueue = [];

  for (const requestData of queue) {
    try {
      const response = await fetch(requestData.url, {
        method: requestData.method,
        headers: requestData.headers,
        body: requestData.body
      });

      if (!response.ok) {
        // Keep failed requests in queue
        processedQueue.push(requestData);
      }
    } catch (error) {
      // Keep failed requests in queue
      console.error('Error processing queued request:', error);
      processedQueue.push(requestData);
    }
  }

  await saveOfflineQueue(processedQueue);
}

// Listen for online event to process queue
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'ONLINE') {
    console.log('Back online, processing queue...');
    processOfflineQueue();
  }
});

