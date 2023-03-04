import React from "react";
const Home = () => {
  const products = [
    { id: 1, name: "Red Men T-Shirt", price: "$3.99" },
    { id: 2, name: "Pink Women Shorts", price: "$5.99" },
    { id: 3, name: "Nike white Shoes", price: "$300" },
  ];
  const saveData = (async) => {
    if (!navigator.onLine) {
      backgroundSync();
      //   serviceWorker.registerSync(); // register background sync request with tag name order
      insertIntoDatabase(products); // insert data into indexedb
      //this.setState({ orders: [...this.state.orders, orderData] });
    }
  };

  const backgroundSync = () => {
    navigator.serviceWorker.ready
      .then((swRegistration) => {
        if (swRegistration.sync) {
          swRegistration.sync.register("post-data");
        }
      })
      .catch(console.log);
  };

  const insertIntoDatabase = (dataObject) => {
    var indexedDBOpenRequest = window.indexedDB.open("order", 1);
    indexedDBOpenRequest.onupgradeneeded = function () {
      this.result.createObjectStore("order_requests", {
        autoIncrement: true,
      });
    };

    indexedDBOpenRequest.onsuccess = function () {
      let db = this.result;
      let transaction = db.transaction("order_requests", "readwrite");
      let storeObj = transaction.objectStore("order_requests");
      storeObj.add(dataObject);
    };
    indexedDBOpenRequest.onerror = function (error) {
      console.error("IndexedDB error:", error);
    };
  };

  return (
    <>
      <div>Home Page</div>
      <button onClick={saveData}> Save Data</button>
    </>
  );
};

export default Home;
