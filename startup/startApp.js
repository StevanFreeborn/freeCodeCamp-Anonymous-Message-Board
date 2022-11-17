import connectDb from '../database/connectDb.js';
import runner from '../test-runner.js';
import logger from '../logging/logger.js';

export default function (app) {
  const dbConnected = connectDb();

  const listener = app.listen(process.env.PORT || 3000, () => {
    const appListMsg = 'Your app is listening on port ' + listener.address().port;
    console.log(appListMsg);
    logger.info(appListMsg);

    if (process.env.NODE_ENV === 'test' && dbConnected) {
      runTestMsg = 'Running Tests...';
      console.log(runTestMsg);
      logger.info(runTestMsg)

      setTimeout(() => {
        try {
          runner.run();
        } catch (err) {
          invalidTestMsg = 'Tests are not valid:';
          console.log(invalidTestMsg);
          logger.info(invalidTestMsg);

          console.error(err);
          logger.error(err);
        }
      }, 1500);
    }
  });
}
