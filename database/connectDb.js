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
      console.log(err);
      logger.error(err);
    });

    mongoose.connection.on('disconnected', () => {
      disconnMsg = `Server disconnected from database at ${new Date().toISOString()}`;
      console.log(disconnMsg);
      logger.info(disconnMsg);
    });

    const connectMsg =`Server connected successfully to ${process.env.NODE_ENV} database.`;

    console.log(connectMsg);
    logger.info(connectMsg)

    return true;
  } catch (err) {
    console.log(err);
    logger.error(err);
    
    return false;
  }
}
