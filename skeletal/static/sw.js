

self.addEventListener('fetch', async (event) => {
    const request = event.request;
    const url = (new URL(request.url));
    if (url.pathname == "/") {
      return;
    }
    if (url.pathname.startsWith("/")) {
        let resp = await fetch('/request?rec='+url.pathname, request)
        event.respondWIth(resp)
    }
  });