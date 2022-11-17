import winston from 'winston';
import consoleTransport from './transports/consoleTransport.js';
import errorFileTransport from './transports/errorFileTransport.js';
import combinedfileTransport from './transports/combinedFileTransport.js';
import logTailTransport from './transports/logTailTransport.js';
import testingFileTransport from './transports/testingFileTransport.js';
import dotevn from 'dotenv';
import exceptionFileTransport from './transports/exceptionFileTransport.js';
dotevn.config()

const createLogger = () => {
  const logger = winston.createLogger({
    level: 'http' || process.env.LOG_LEVEL,
    format: winston.format.combine(
      winston.format.errors({
        stack: true
      }),
      winston.format.timestamp(),
      winston.format.json()
    ),
    exceptionHandlers: [
      exceptionFileTransport(),
    ]
  });

  switch (process.env.NODE_ENV) {
    case 'production':
      logger
        .add(errorFileTransport())
        .add(combinedfileTransport())
        .add(logTailTransport());
      break;
    case 'test':
      logger.add(testingFileTransport());
      break;
    case 'developement':
    default:
      logger.add(consoleTransport());
      break;
  }

  return logger;
};

const logger = createLogger();

export default logger;
