import dotevn from 'dotenv';
import setupExpress from './startup/setupExpress.js';
import helmetMiddleware from './middleware/helmetMiddleware.js';
import apiRoutes from './routes/api.js';
import appRoutes from './routes/app.js';
import fccTestingRoutes from './routes/fcctesting.js';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import startApp from './startup/startApp.js';
import loggingMiddleware from './middleware/loggingMiddleware.js';

dotevn.config();

const app = setupExpress();

helmetMiddleware(app);
loggingMiddleware(app);
fccTestingRoutes(app);
apiRoutes(app);
appRoutes(app);
notFoundMiddleware(app);
startApp(app);

export default app;
