chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "API_USAGE") {
    console.log("API Usage Detected:", msg.api, "on", msg.url);

    // You can also send it to backend here using fetch()
    // fetch('https://your-backend.com/api/usage', { method: 'POST', body: JSON.stringify(msg) });

    chrome.storage.local.get({ logs: [] }, (data) => {
      const updatedLogs = [...data.logs, msg];
      chrome.storage.local.set({ logs: updatedLogs });
    });
  }
});
