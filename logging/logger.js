import winston from 'winston';
import consoleTransport from './transports/consoleTransport.js';
import errorFileTransport from './transports/errorFileTransport.js';
import combinedfileTransport from './transports/combinedFileTransport.js';
import logTailTransport from './transports/logTailTransport.js';
import testingFileTransport from './transports/testingFileTransport.js';
import dotevn from 'dotenv';
dotevn.config()

const createLogger = () => {
  const logger = winston.createLogger({
    level: 'http' || process.env.LOG_LEVEL,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [],
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
