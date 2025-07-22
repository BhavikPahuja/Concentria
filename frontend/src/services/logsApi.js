import { apiService } from "./authApi.js";
import { config } from "../config/api.js";

/**
 * Logs API Service for handling activity logs
 */
class LogsApiService {
  /**
   * Helper function to create properly formatted log entries
   */
  createLogEntry(type, action, details = "", additionalData = {}) {
    return {
      type: type,
      action: action,
      details: details,
      timestamp: new Date().toISOString(),
      ip: null, // Will be set by backend
      ...additionalData,
    };
  }

  /**
   * Helper function to create schema-compliant log entries
   * Schema: { userEmail, type, timestamp, url?, filename? }
   */
  createSchemaCompliantLogEntry(userEmail, type, url = null, filename = null) {
    const entry = {
      userEmail: userEmail,
      type: type,
      timestamp: new Date().toISOString(),
    };

    if (url) entry.url = url;
    if (filename) entry.filename = filename;

    return entry;
  }

  /**
   * Predefined log templates for common activities
   */
  getLogTemplates() {
    return {
      auth: {
        login: (email) =>
          this.createLogEntry(
            "auth",
            "User Login",
            `User ${email} logged in successfully`
          ),
        logout: (email) =>
          this.createLogEntry(
            "auth",
            "User Logout",
            `User ${email} logged out`
          ),
        failed_login: (email) =>
          this.createLogEntry(
            "auth",
            "Failed Login",
            `Failed login attempt for ${email}`
          ),
        register: (email) =>
          this.createLogEntry(
            "auth",
            "User Registration",
            `New user ${email} registered`
          ),
        token_refresh: () =>
          this.createLogEntry(
            "auth",
            "Token Refresh",
            "Access token refreshed automatically"
          ),
      },
      privacy: {
        data_access: (type) =>
          this.createLogEntry(
            "privacy",
            "Data Access",
            `${type} data accessed`
          ),
        consent_given: (type) =>
          this.createLogEntry(
            "privacy",
            "Consent Given",
            `Consent given for ${type}`
          ),
        consent_revoked: (type) =>
          this.createLogEntry(
            "privacy",
            "Consent Revoked",
            `Consent revoked for ${type}`
          ),
        privacy_check: () =>
          this.createLogEntry(
            "privacy",
            "Privacy Check",
            "Privacy settings reviewed"
          ),
      },
      security: {
        security_scan: () =>
          this.createLogEntry(
            "security",
            "Security Scan",
            "System security validation completed"
          ),
        suspicious_activity: (details) =>
          this.createLogEntry("security", "Suspicious Activity", details),
        password_change: () =>
          this.createLogEntry(
            "security",
            "Password Change",
            "User password changed"
          ),
      },
      system: {
        api_call: (endpoint) =>
          this.createLogEntry("api", "API Request", `API call to ${endpoint}`),
        error: (error) => this.createLogEntry("error", "System Error", error),
        warning: (warning) =>
          this.createLogEntry("warning", "System Warning", warning),
      },
    };
  }

  /**
   * Schema-compliant log templates for the 10 specific privacy log types
   * Schema: { userEmail, type, timestamp, url?, filename? }
   */
  getPrivacyLogTemplates() {
    return {
      geolocation: (userEmail, url) =>
        this.createSchemaCompliantLogEntry(userEmail, "geolocation", url),
      clipboard: (userEmail, url) =>
        this.createSchemaCompliantLogEntry(userEmail, "clipboard", url),
      deviceOrientation: (userEmail, url) =>
        this.createSchemaCompliantLogEntry(userEmail, "deviceorientation", url),
      permissions: (userEmail, url) =>
        this.createSchemaCompliantLogEntry(userEmail, "permissions", url),
      cut: (userEmail, url) =>
        this.createSchemaCompliantLogEntry(userEmail, "cut", url),
      copy: (userEmail, url) =>
        this.createSchemaCompliantLogEntry(userEmail, "copy", url),
      paste: (userEmail, url) =>
        this.createSchemaCompliantLogEntry(userEmail, "paste", url),
      microphone: (userEmail, url) =>
        this.createSchemaCompliantLogEntry(userEmail, "microphone", url),
      camera: (userEmail, url) =>
        this.createSchemaCompliantLogEntry(userEmail, "camera", url),
      download: (userEmail, url, filename) =>
        this.createSchemaCompliantLogEntry(
          userEmail,
          "download",
          url,
          filename
        ),
    };
  }

  /**
   * Create a new log entry
   */
  async createLog(logData) {
    try {
      const response = await apiService.makeRequest(
        config.endpoints.logs.create,
        {
          method: "POST",
          body: JSON.stringify(logData),
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating log:", error);
      throw error;
    }
  }

  /**
   * Get all logs
   */
  async getAllLogs() {
    try {
      console.log("🔍 LogsAPI: Starting getAllLogs request");
      console.log(
        "🔍 LogsAPI: Token exists:",
        !!localStorage.getItem("accessToken")
      );
      console.log("🔍 LogsAPI: API URL:", config.API_URL || apiService.baseURL);
      console.log("🔍 LogsAPI: Endpoint:", config.endpoints.logs.getAll);

      const response = await apiService.makeRequest(
        config.endpoints.logs.getAll,
        {
          method: "GET",
        }
      );

      console.log("🔍 LogsAPI: Response received:", response);

      // Handle new response structure with nested logs array
      if (response && response.logs && Array.isArray(response.logs)) {
        console.log(
          "🔍 LogsAPI: Extracted logs array:",
          response.logs.length,
          "items"
        );
        console.log("🔍 LogsAPI: Pagination info:", response.pagination);
        return response.logs;
      }

      // Fallback for direct array response (backward compatibility)
      if (Array.isArray(response)) {
        console.log(
          "🔍 LogsAPI: Direct array response:",
          response.length,
          "items"
        );
        return response;
      }

      console.warn("🔍 LogsAPI: Unexpected response structure:", response);
      return [];
    } catch (error) {
      console.error("Error fetching logs:", error);
      console.error("🔍 LogsAPI: Full error details:", {
        status: error.status,
        message: error.message,
        url: `${config.API_URL || apiService.baseURL}${
          config.endpoints.logs.getAll
        }`,
      });
      throw error;
    }
  }

  /**
   * Delete all logs
   */
  async deleteAllLogs() {
    try {
      const response = await apiService.makeRequest(
        config.endpoints.logs.deleteAll,
        {
          method: "DELETE",
        }
      );
      return response;
    } catch (error) {
      console.error("Error deleting logs:", error);
      throw error;
    }
  }

  /**
   * Get dashboard statistics from logs
   */
  async getDashboardStats() {
    try {
      const logs = await this.getAllLogs();

      // Process logs to generate statistics
      const stats = this.processLogsForStats(logs);

      return stats;
    } catch (error) {
      console.error("Error getting dashboard stats:", error);
      // Return default stats if API fails
      return this.getDefaultStats();
    }
  }

  /**
   * Process logs to generate dashboard statistics
   */
  processLogsForStats(logs) {
    if (!logs || !Array.isArray(logs)) {
      return this.getDefaultStats();
    }

    const stats = {
      totalLogs: logs.length,
      recentLogs: logs.slice(-10), // Last 10 logs
      logsByType: {},
      logsByRisk: {
        high: 0,
        medium: 0,
        low: 0,
      },
      todayLogs: 0,
    };

    const today = new Date().toDateString();

    logs.forEach((log) => {
      // Count by type
      const type = log.type || "Unknown";
      stats.logsByType[type] = (stats.logsByType[type] || 0) + 1;

      // Count by risk level
      const risk = log.riskLevel || "low";
      if (stats.logsByRisk[risk] !== undefined) {
        stats.logsByRisk[risk]++;
      }

      // Count today's logs
      const logDate = new Date(log.timestamp || log.createdAt);
      if (logDate.toDateString() === today) {
        stats.todayLogs++;
      }
    });

    return stats;
  }

  /**
   * Get default statistics when API fails
   */
  getDefaultStats() {
    return {
      totalLogs: 0,
      recentLogs: [],
      logsByType: {},
      logsByRisk: {
        high: 0,
        medium: 0,
        low: 0,
      },
      todayLogs: 0,
    };
  }
}

// Create and export singleton instance
export const logsApiService = new LogsApiService();
export default logsApiService;
