if ("serviceWorker" in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register("/static/sw.js").then(
      (registration) => {
        alert("Service worker registration succeeded:", registration);
      },
      (error) => {
        alert(`Service worker registration failed: ${error}`);
      },
    );
  } else {
    alert("Service workers are not supported.");
  }