import {
  getCookies,
  setCookie,
  deleteCookie,
  deleteAllCookies
} from '../utils/cookieUtils.js';
import { config } from "../config.js";

const API_URL = config.API_URL;

// --- Tabs ---
document.getElementById('logsTab').onclick = () => switchTab('logs');
document.getElementById('cookiesTab').onclick = () => switchTab('cookies');

function switchTab(tab) {
  document.getElementById('logsTab').classList.toggle('active', tab === 'logs');
  document.getElementById('cookiesTab').classList.toggle('active', tab === 'cookies');
  document.getElementById('logsSection').classList.toggle('hidden', tab !== 'logs');
  document.getElementById('cookiesSection').classList.toggle('hidden', tab !== 'cookies');
  if (tab === 'cookies') loadCookies();
}

// --- Logs ---
async function fetchLogsFromBackend() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch logs");
    console.log(response);
    
    return await response.json();
  } catch (e) {
    console.error("[popup] Fetch logs error:", e);
    showError("Could not fetch logs from backend.");
    return [];
  }
}

// Render logs: newest first
async function renderLogs() {
  const logs = await fetchLogsFromBackend();
  if (!Array.isArray(logs)) {
    console.error("Expected logs to be an array, but got:", logs);
    return;
  }
  const tbody = document.getElementById('logsContent');
  tbody.innerHTML = '';
  logs.slice().reverse().forEach(log => {
    const displayUrl = log.url && log.url.length > 25 ? log.url.slice(0, 25) + '...' : (log.url || '');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${new Date(log.timestamp).toLocaleString()}</td>
      <td>${log.type}</td>
      <td class="url-scroll" title="${log.url || ''}">${displayUrl}</td>`;
    tbody.appendChild(row);
  });
}
renderLogs();

// Download logs from backend
document.getElementById('downloadLogs').onclick = async () => {
  const logs = await fetchLogsFromBackend();
  downloadJSON(logs, 'logs.json');
};

// Clear all logs in backend
document.getElementById('clearAllLogs').onclick = async () => {
  try {
    const response = await fetch(API_URL, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to clear logs");
    await renderLogs();
    alert('All logs cleared!');
  } catch (e) {
    showError("Could not clear logs on backend.");
    console.error("[popup] Clear logs error:", e);
  }
};

// --- Cookies ---
document.getElementById('downloadCookies').onclick = async () => {
  const cookies = await getDomainCookies();
  downloadJSON(cookies, 'cookies.json');
};

document.getElementById('deleteAllCookies').onclick = async () => {
  const cookies = await getDomainCookies();
  await deleteAllCookies(cookies);
  loadCookies();
};

// Dashboard button
document.getElementById('openDashboard').onclick = () => {
  chrome.tabs.create({ url: 'https://your-frontend-dashboard.com/' });
};

async function loadCookies() {
  const cookies = await getDomainCookies();
  const tbody = document.getElementById('cookiesContent');
  tbody.innerHTML = '';
  cookies.forEach(cookie => {
    const row = document.createElement('tr');
    const url = (cookie.secure ? 'https://' : 'http://') + cookie.domain.replace(/^\./, '') + cookie.path;
    row.innerHTML = `
      <td>${cookie.name}</td>
      <td><input value="${cookie.value}" id="v-${cookie.name}"></td>
      <td>${cookie.domain}</td>
      <td>${cookie.path}</td>
      <td>
        <button onclick="update('${cookie.name}', '${url}')">Save</button>
        <button onclick="remove('${cookie.name}', '${url}')">Del</button>
      </td>`;
    tbody.appendChild(row);
  });
}

async function getDomainCookies() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  return getCookies(url.hostname);
}

window.update = async (name, url) => {
  const val = document.getElementById(`v-${name}`).value;
  await setCookie({ url, name, value: val });
  alert('Updated');
};

window.remove = async (name, url) => {
  await deleteCookie(url, name);
  loadCookies();
};

function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Optional: show error in UI
function showError(msg) {
  alert(msg); // Replace with better UI if desired
}
