import helmet from 'helmet';

export default function (app) {
  app.use(helmet.frameguard({ action: 'sameorigin' }));
  app.use(helmet.dnsPrefetchControl({ allow: false }));
  app.use(helmet.referrerPolicy({ policy: ['same-origin'] }));
}
