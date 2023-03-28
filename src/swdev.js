export default function swDev() {
  let swUrl = `${window.location.origin}/sw.js`;
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => navigator.serviceWorker.ready)
    .then((registration) => {
      // register sync
      if (registration.sync) {
        registration.sync.register("order").then(() => {
          console.log("Sync registered");
        });
      }
    });
}
