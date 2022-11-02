'use strict';
require('dotenv').config();
const setupExpress = require('./startup/setupExpress.js');
const helmetMiddleware = require('./middleware/helmetMiddleware.js');
const apiRoutes = require('./routes/api.js');
const appRoutes = require('./routes/app.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const notFoundMiddleware = require('./middleware/notFoundMiddleware.js');
const startApp = require('./startup/startApp.js');

const app = setupExpress();

helmetMiddleware(app);
fccTestingRoutes(app);
apiRoutes(app);
appRoutes(app);
notFoundMiddleware(app);
startApp(app);

module.exports = app;
