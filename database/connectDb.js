import mongoose, { disconnect } from 'mongoose';
import logger from '../logging/logger.js';

export default function () {
  let mongoConnectionString;

  switch (process.env.NODE_ENV) {
    case 'development':
      mongoConnectionString = process.env.MONGO_DEV_URI;
      break;
    case 'test':
      mongoConnectionString = process.env.MONGO_TEST_URI;
      break;
    default:
      mongoConnectionString = process.env.MONGO_PROD_URI;
      break;
  }

  try {
    mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('error', err => {
      logger.error(err.message, { error: err, });
    });

    mongoose.connection.on('disconnected', () => {
      logger.info(`Server disconnected from database at ${new Date().toISOString()}`);
    });

    logger.info(`Server connected successfully to ${process.env.NODE_ENV} database.`)

    return true;
  } catch (err) {
    logger.error(err.message, { error: err, });
    
    return false;
  }
}
