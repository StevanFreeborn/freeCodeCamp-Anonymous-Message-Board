import logger from '../logging/logger.js';
import morgan from 'morgan';

export default function (app) {
  morgan.token('requestHeaders', (req, res) => req.headers);
  morgan.token('responseHeaders', (req, res) => res.getHeaders());
  morgan.token('requestBody', (req, res) =>
    Object.keys(req.body).length == 0 ? undefined : req.body
  );
  morgan.token('reqId', (req, res) => req.id);

  const formatHttpLogMessage = (tokens, req, res) => {
    return JSON.stringify({
      requestId: tokens.reqId(req, res),
      requestInfo: {
        httpVersion: tokens['http-version'](req, res),
        method: tokens.method(req, res),
        referrer: tokens.referrer(req, res),
        remoteAddress: tokens['remote-addr'](req, res),
        url: tokens.url(req, res),
        requestBody: tokens.requestBody(req, res),
        requestHeaders: tokens.requestHeaders(req, res),
      },
      responseInfo: {
        status: Number.parseFloat(tokens.status(req, res)),
        responseTime: Number.parseFloat(tokens['response-time'](req, res)),
        totalTime: Number.parseFloat(tokens['total-time'](req, res)),
        responseHeaders: tokens.responseHeaders(req, res),
      },
    });
  };

  app.use(
    morgan(formatHttpLogMessage, {
      stream: {
        write: message => {
          const data = JSON.parse(message);
          logger.http('request received', data);
        },
      },
    })
  );
}
