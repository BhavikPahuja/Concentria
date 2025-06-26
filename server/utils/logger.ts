// src/utils/logger.ts
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { v4 as uuidv4 } from 'uuid';
import { formatTime, formatTimestamp } from './dateTimeUtils';
import { env } from '../config';

// Generate a unique correlation ID for each request
const getCorrelationId = () => uuidv4();

// Log format: JSON with timestamp and correlation ID for traceability
const jsonLogFormat = format.printf(
  ({ timestamp, level, message, correlationId, stack }) => {
    return JSON.stringify({
      timestamp: formatTimestamp(timestamp as string),
      level,
      message,
      correlationId,
      stack: env !== 'production' ? stack : undefined, // Conditionally include stack trace
    });
  }
);

// Enhanced format for console logs
const consoleLogFormat = format.printf(
  ({ timestamp, level, message, stack }) => {
    let logMessage = `[${level}] ${formatTime(timestamp as string)}: ${message}`;
    if (env !== 'production' && stack) {
      logMessage += `\n${stack}`;
    }
    return logMessage;
  }
);

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        consoleLogFormat
      )
    }),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d', // Keep logs for 30 days
      level: 'info',
      format: format.combine(
        format.timestamp(),
        jsonLogFormat
      )
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '90d', // Keep error logs for 90 days
      level: 'error',
      format: format.combine(
        format.timestamp(),
        jsonLogFormat
      )
    }),
  ],
});

export default logger;
export { getCorrelationId };