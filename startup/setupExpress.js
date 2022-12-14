import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export default function () {
  const app = express();
  app.disable('x-powered-by');
  app.use('/public', express.static(process.cwd() + '/public'));
  app.use(cors({ origin: '*' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  return app;
}
