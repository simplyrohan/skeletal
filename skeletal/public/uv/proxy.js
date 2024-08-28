const form = document.getElementById("uv-form");

const address = document.getElementById("uv-address");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");

function search(input, template) {
  try {
    // eg: https://example.com, https://example.com/test?q=param
    return new URL(input).toString();
  } catch (err) {
  }

  try {
    // input is a valid URL when http:// is added to the start:
    // eg: example.com, https://example.com/test?q=param
    const url = new URL(`http://${input}`);
    // only if the hostname has a TLD/subdomain
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
    // input was not valid URL
  }

  // Attempts to convert the input to a fully qualified URL have failed
  // Treat the input as a search query
  return template.replace("%s", encodeURIComponent(input));
}


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, "https://www.google.com/search?q=%s");
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

function openPage(url) {
  registerSW()
    .then(() => {
      location.href = "/uv/service/" + __uv$config.encodeUrl(url);
    });
}