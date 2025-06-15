chrome.storage.local.get({ logs: [] }, (data) => {
    console.log("Received message from content script:", msg);
  const logsContainer = document.getElementById("logs");
  data.logs.slice(-20).reverse().forEach(log => {
    const div = document.createElement("div");
    div.className = "log";
    div.textContent = `[${log.timestamp}] ${log.api} → ${new URL(log.url).hostname}`;
    logsContainer.appendChild(div);
  });
});
