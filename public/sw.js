// Версия кеша, изменяйте при обновлении данных
const CACHE_VERSION = 'v2';
const CACHE_NAME = `art-gallery-cache-${CACHE_VERSION}`;

// Список ресурсов для кеширования
const urlsToCache = [
  '/',
  '/gallery',
  '/about',
  '/contacts',
];

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеш открыт');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Активируем сразу
  );
});

// Активация Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Удаляем старые версии кеша
          if (cacheName !== CACHE_NAME) {
            console.log('Удаляем старый кеш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Берем под контроль все клиенты
  );
});

// Перехват запросов
self.addEventListener('fetch', event => {
  // Не кешируем запросы к API
  if (event.request.url.includes('/api/')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем из кеша, если есть
        if (response) {
          return response;
        }
        
        // Иначе делаем запрос к серверу
        return fetch(event.request).then(
          response => {
            // Проверяем, что получили валидный ответ
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Клонируем ответ, так как он может быть использован только один раз
            const responseToCache = response.clone();
            
            // Кешируем ответ
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          }
        );
      })
  );
});
