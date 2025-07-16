import { config } from "./config.js";

const API_URL = config.API_URL;

// Send log to backend (no local storage)
function sendLogToBackend(log) {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log),
  }).catch((e) => console.error("[background] Backend error:", e));
}

// Handle download event
chrome.downloads.onCreated.addListener((downloadItem) => {
  const log = {
    type: "download",
    timestamp: new Date().toISOString(),
    url: downloadItem.url,
    filename: downloadItem.filename,
  };

  // Send to backend only
  sendLogToBackend(log);

  // Notify content script to show emoji
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "showDownloadEmoji" });
    }
  });
});

// Handle generic log events from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[background] Received message:", message);

  if (message.action === "logEvent" || message.type) {
    const log = message.log || message; // Accept both formats

    // Send to backend only
    sendLogToBackend(log);

    sendResponse({ status: "ok" });
    return true; // Keep service worker alive for async sendResponse
  }
});
