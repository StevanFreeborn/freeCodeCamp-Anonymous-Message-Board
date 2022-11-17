import logger from '../logging/logger.js';
import morgan from 'morgan';

export default function (app) {
  morgan.token('requestHeaders', (req, res) => req.headers);
  morgan.token('responseHeaders', (req, res) => res.getHeaders());
  morgan.token('requestBody', (req, res) =>
    Object.keys(req.body).length == 0 ? undefined : req.body
  );

  const httpLogMessageFormat = (tokens, req, res) => {
    return JSON.stringify({
      requestInfo: {
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        requestHeaders: tokens.requestHeaders(req, res),
        requestBody: tokens.requestBody(req, res),
        status: Number.parseFloat(tokens.status(req, res)),
        responseTime: Number.parseFloat(tokens['response-time'](req, res)),
        responseHeaders: tokens.responseHeaders(req, res),
      },
    });
  };

  app.use(
    morgan(httpLogMessageFormat, {
      stream: {
        write: message => {
          const data = JSON.parse(message);
          logger.http('incoming request', data);
        },
      },
    })
  );
}
