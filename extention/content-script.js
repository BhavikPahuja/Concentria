(function () {
  const logUsage = (api) => {
    window.postMessage({ type: "API_USAGE", api }, "*");
  };

  // GeoLocation
  const originalGeo = navigator.geolocation.getCurrentPosition;
  navigator.geolocation.getCurrentPosition = function (...args) {
    logUsage("Geolocation");
    return originalGeo.apply(this, args);
  };

  // Clipboard
  document.addEventListener("copy", () => logUsage("Clipboard - Copy"));
  document.addEventListener("paste", () => logUsage("Clipboard - Paste"));

  // DeviceOrientation
  window.addEventListener("deviceorientation", () =>
    logUsage("DeviceOrientationEvent")
  );

  // Battery API
  if (navigator.getBattery) {
    navigator.getBattery().then(() => logUsage("Battery API"));
  }

  // Canvas Fingerprinting (basic detection)
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillText("Detecting fingerprint", 10, 10);
  logUsage("Canvas Fingerprinting");

  // Post usage to background
  window.addEventListener("message", (event) => {
    if (event.source !== window || event.data.type !== "API_USAGE") return;
    chrome.runtime.sendMessage({
      type: "API_USAGE",
      api: event.data.api,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });
  });
})();
