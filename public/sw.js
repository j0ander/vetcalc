// public/sw.js
const CACHE_NAME = 'vetcalc-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.ts',
  '/src/pages/splash/SplashController.ts',
  '/src/pages/splash/SplashView.ts',
  '/src/pages/home/HomeController.ts',
  '/src/pages/home/HomeView.ts',
  '/src/models/Patient.ts',
  '/src/models/CalculationHistory.ts',
  '/src/types/index.ts',
  '/src/constants/index.ts',
  '/src/utils/index.ts',
  '/src/services/MockDataService.ts'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets...')
        return cache.addAll(urlsToCache)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
    .then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }
        
        // Clone the request
        const fetchRequest = event.request.clone()
        
        // Try network
        return fetch(fetchRequest).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          
          // Clone the response
          const responseToCache = response.clone()
          
          // Cache the fetched resource
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })
          
          return response
        })
      })
  )
})

// Background sync for offline operations (future feature)
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event)
  if (event.tag === 'sync-calculations') {
    event.waitUntil(syncCalculations())
  }
})

async function syncCalculations() {
  console.log('Syncing offline calculations...')
  // Future implementation: sync IndexedDB calculations when online
}

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event)
  const options = {
    body: event.data?.text() || 'New update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200]
  }
  
  event.waitUntil(
    self.registration.showNotification('VetCalc', options)
  )
})