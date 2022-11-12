import connectDb from '../database/connectDb.js';
import runner from '../test-runner.js';

export default function (app) {
  const dbConnected = connectDb();

  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);

    if (process.env.NODE_ENV === 'test' && dbConnected) {
      console.log('Running Tests...');
      setTimeout(() => {
        try {
          runner.run();
        } catch (e) {
          console.log('Tests are not valid:');
          console.error(e);
        }
      }, 1500);
    }
  });
}
