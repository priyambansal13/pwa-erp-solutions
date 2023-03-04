let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "static/js/bundle.js ",
        "/manifest.json",
        "/index.html",
        "/",
        "/about",
        "/users",
      ]);
    })
  );
});
this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    // if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
    //   event.waitUntil(
    //     this.registration.showNotification("Internet", {
    //       body: "internet not working",
    //     })
    //   );
    // }
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});

this.addEventListener("sync", function (event) {
  if (event.tag == "post-data") {
    event.waitUntil(getOrderData());
  }
});

function getOrderData() {
  var indexedDBOpenRequest = indexedDB.open("order", 1);
  indexedDBOpenRequest.onsuccess = function () {
    let db = this.result;
    let transaction = db.transaction("order_requests", "readwrite");
    let storeObj = transaction.objectStore("order_requests");
    var cursorRequest = storeObj.openCursor();
    cursorRequest.onsuccess = function (evt) {
      var cursor = evt.target.result;
      if (cursor) {
        sendTableOrder(cursor.value, cursor.key);
        cursor.continue();
      }
    };
  };
  indexedDBOpenRequest.onerror = function (error) {
    console.error("IndexedDB error:", error);
  };
}

// order sent to the server
function sendTableOrder(data, index) {
  console.log("server", data);
  deleteFromIndexdb(index);
  //   fetch(URL + "orders", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   }).then((response) => {
  //     if (response) {
  //       deleteFromIndexdb(index);
  //     }
  //   });
}

// delete data from indexedb, that sent to server
function deleteFromIndexdb(index) {
  var indexedDBOpenRequest = indexedDB.open("order", 1);
  indexedDBOpenRequest.onsuccess = function () {
    let db = this.result;
    let transaction = db.transaction("order_requests", "readwrite");
    let storeObj = transaction.objectStore("order_requests");
    storeObj.get(1).onsuccess = function (event) {
      console.log("[Transaction - GET] product with id 1", event.target.result);
    };
    storeObj.delete(index);
  };
}
