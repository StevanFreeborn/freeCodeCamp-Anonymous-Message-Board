'use strict';
require('dotenv').config();
const setupExpress = require('./middleware/setupExpress.js');
const helmetMiddleware = require('./middleware/helmetMiddleware.js');
const apiRoutes = require('./routes/api.js');
const appRoutes = require('./routes/app.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const notFoundMiddleware = require('./middleware/notFoundMiddleware.js');

const app = setupExpress();

helmetMiddleware(app);
fccTestingRoutes(app);
apiRoutes(app);
appRoutes(app);
notFoundMiddleware(app);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
  if (process.env.NODE_ENV === 'test') {
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

module.exports = app;
