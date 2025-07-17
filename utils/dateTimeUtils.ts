// src/utils/dateUtils.ts

/**
 * Converts a timestamp to a readable format.
 * @param timestamp - The timestamp to convert.
 * @returns A string representing the formatted date and time.
 */
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-US", options);
};

/**
 * Converts a timestamp to a time-only format (hh:mm:ss).
 * @param timestamp - The timestamp to convert.
 * @returns A string representing the formatted time.
 */
export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return date.toLocaleTimeString("en-US", options);
};

/**
 * Converts a time string to milliseconds.
 * @param timeStr - The time string (e.g., "30d", "15m").
 * @returns The time in milliseconds.
 */
export const timeStringToMs = (timeStr: string): number => {
  const timeValue = parseInt(timeStr.slice(0, -1), 10);
  const timeUnit = timeStr.slice(-1);

  switch (timeUnit) {
    case "d":
      return timeValue * 24 * 60 * 60 * 1000; // days to milliseconds
    case "h":
      return timeValue * 60 * 60 * 1000; // hours to milliseconds
    case "m":
      return timeValue * 60 * 1000; // minutes to milliseconds
    case "s":
      return timeValue * 1000; // seconds to milliseconds
    default:
      throw new Error(`Invalid time unit: ${timeUnit}`);
  }
};
