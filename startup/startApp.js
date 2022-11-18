import connectDb from '../database/connectDb.js';
import runner from '../test-runner.js';
import logger from '../logging/logger.js';

export default function (app) {
  const dbConnected = connectDb();

  const listener = app.listen(process.env.PORT || 3000, () => {
    logger.info('Your app is listening on port ' + listener.address().port);

    if (process.env.NODE_ENV === 'test' && dbConnected) {
      logger.info('Running Tests...')

      setTimeout(() => {
        try {
          runner.run();
        } catch (err) {
          logger.info('Tests are not valid:');
          logger.error(err.message, { error: err, });
        }
      }, 1500);
    }
  });
}
