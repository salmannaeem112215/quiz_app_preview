'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "ccd4e487c9c3b4bd26b7f0efa3b9e664",
"assets/assets/DB/papers/history_l1.json": "75fe269148670189024411b2154fb871",
"assets/assets/DB/papers/history_l2.json": "4b7480afcc05e6293fe5ebc283cc981c",
"assets/assets/DB/papers/history_l3.json": "04013b00de158a9f79793fdfb13ee7d5",
"assets/assets/DB/papers/numeracy_l1.json": "0e9a539f588a98df08da932f521049a9",
"assets/assets/DB/papers/numeracy_l2.json": "8b28884530a5186fdb678293bbda26c9",
"assets/assets/DB/papers/numeracy_l3.json": "606b048abc4d2bfbd6b1b57997398ca4",
"assets/assets/DB/papers/test.dart": "532f4d902ff12283f83a9d7ec526b94c",
"assets/assets/DB/rules/quiz_rules.json": "0315cccf6199115921360ee44f0ef3df",
"assets/assets/icons/AppIcons.ttf": "9fae62f87953ca4af217ad77b58e88fd",
"assets/assets/icons/code.svg": "ed76ff3eeba97abcca242314f776b5e3",
"assets/assets/icons/contact.svg": "e87f9d19932e2dbca1634ae8ed68aa4d",
"assets/assets/icons/email.svg": "6018c87e1d3ca82bac28a652b30829f5",
"assets/assets/icons/github.svg": "4df08b5af208a35fcca413e3ab33f5f4",
"assets/assets/icons/google.svg": "bdb1c05028cb0faf7779ab812849d110",
"assets/assets/icons/logout.svg": "b1b7227d8ccbfa6f5e6a1255855938be",
"assets/assets/icons/menu.svg": "434a62c1ecb4915dc88c6327e3b94b6a",
"assets/assets/icons/menuleft.svg": "41c7969d3ba70c6733226a44fe3d07a0",
"assets/assets/icons/peace.svg": "5b27c2142ee5f647a5f678ac7db8eaa2",
"assets/assets/icons/rate.svg": "5b14e7b1aba5c8ccd1a359003613c95c",
"assets/assets/icons/trophyoutline.svg": "d07258ab3ed535bab49c6ac247301f8d",
"assets/assets/icons/web.svg": "579e22c21a3e6f4c139543d55115fc87",
"assets/assets/images/app_splash_logo.png": "5ec7bf4e530968f1e2255c23009c9a96",
"assets/assets/images/app_splash_logo.svg": "2a3bd9f907295714d4883ce062bc0cac",
"assets/assets/images/bulb.svg": "1614e0dbf96569c2d83855471d79e3f6",
"assets/assets/images/New%2520DOCX%2520Document.docx": "a0346fe935db229fd30f1f9d606b8750",
"assets/assets/images/physics.png": "661afb998e7f942c16f149e9bcb80673",
"assets/FontManifest.json": "b59207173307c0258f5a32f18251227d",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "db6d898313200011118ce9849f56d7d0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "de85a168c43f11ce10b6fdb43b5bb449",
"/": "de85a168c43f11ce10b6fdb43b5bb449",
"main.dart.js": "8135f74268d2b87d25510fff44d44c5e",
"manifest.json": "e2902673493477b105814cf58d8726b6",
"version.json": "dbc07f78106391781d21fd5fc1f2c33a"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
