import { apiService } from "./authApi.js";
import { config } from "../config/api.js";

/**
 * Logs API Service for handling activity logs
 */
class LogsApiService {
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
