
//Criando uma variavel que nomeia o nome do cache e um array dos arquivos que serão cacheados.
const cacheName = 'v1';

const cacheAssets = [
  './',
  'index.html',
  'restaurant.html',
  '/css/styles.css',
  '/css/responsivo.css',
  '/data/restaurants.json',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/js/main.js'
];


//Instalando um Service Worker, usando promessas e passando o array para saber se a instalação foi bem sucedida
self.addEventListener('install', e => {
  console.log('Service Worker: Instalado');

  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});


// Ativando o Service Worker
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  
  //Limpando o cache antigo, passando o array de cache para o  map, e verificando se o cache atual é diferente do cache que estamos armazenando, caso seja será excluido.
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Faz uma solicitação e retorna os resultados armazenados no cache.
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});




