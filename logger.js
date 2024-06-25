import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

const { combine, timestamp, printf } = format;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a logger instance
const logger = createLogger({
  level: 'info', // Set the default logging level
  format: combine(
    timestamp(), // Add timestamp to log entries
    logFormat
  ),
  transports: [
    // Log to console
    new transports.Console(),
    // Log to daily rotating file
    new DailyRotateFile({
      filename: path.join(__dirname, 'logs', 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info' // Set log level for this transport
    })
  ]
});

export default logger;
