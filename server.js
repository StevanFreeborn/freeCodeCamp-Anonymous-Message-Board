import dotevn from 'dotenv';
import setupExpress from './startup/setupExpress.js';
import helmetMiddleware from './middleware/helmetMiddleware.js';
import apiRoutes from './routes/api.js';
import appRoutes from './routes/app.js';
import fccTestingRoutes from './routes/fcctesting.js';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import startApp from './startup/startApp.js';
import loggingMiddleware from './middleware/loggingMiddleware.js';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware.js';

dotevn.config();

const app = setupExpress();

loggingMiddleware(app);
helmetMiddleware(app);
fccTestingRoutes(app);
apiRoutes(app);
appRoutes(app);
notFoundMiddleware(app);
errorHandlingMiddleware(app);
startApp(app);

export default app;
