# Data-Access-Monitor
Project Report: Data Access Monitor
1. Project Title
Data Access Monitor - Chrome Extension and Dashboard
2. Objective
To create a consent-based browser extension and dashboard that monitors sensitive data access APIs such
as geolocation, clipboard, device sensors, etc. The extension logs when these APIs are accessed and allows
the user to view, control, and revoke them from a central dashboard.
3. Features Implemented
- Chrome extension with Manifest v3
- Monitors access to:
 - Geolocation API
 - Clipboard events (copy/paste)
 - Device Orientation
 - Battery API
- Logs stored using chrome.storage API
- Popup UI to display recent logs
- Background service worker to collect and store logs
- Works across all URLs using content scripts
4. Technologies Used
- HTML, CSS, JavaScript for frontend (popup and content script)
- Chrome Extension APIs (Manifest v3)
- chrome.storage for temporary log storage
- Console tools for debugging
5. How it Works
1. Content scripts are injected into every page the user visits.
Project Report: Data Access Monitor
2. These scripts hook into sensitive APIs and send messages to the background script.
3. Background script logs the API access with timestamp and domain.
4. Logs are stored in chrome.storage.local.
5. The popup UI fetches and displays the latest logs.
6. Challenges Faced
- Content scripts must run early enough to catch access
- Communicating between scripts and service workers using runtime messages
- Handling permissions correctly to comply with Chrome security
- Testing with different websites to ensure consistent behavior
7. Future Scope
- Connect the extension to a MERN backend to store logs permanently
- Add a React-based dashboard to manage cookie policies and API permissions
- Real-time alerts when sensitive data is accessed
- Option to block or revoke specific APIs for specific websites
- Integrate with Indian legal frameworks for user data rights (DPDP Act)
- Browser notifications when new data is accessed without consent
8. Conclusion
The Data Access Monitor extension is a privacy-first tool that empowers users to understand and control
what kind of sensitive data websites access in their browser. It is designed with a vision to expand into a full
consent management platform.
