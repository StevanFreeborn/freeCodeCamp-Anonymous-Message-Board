import morgan from 'morgan';
import { join } from 'path';
import { createStream } from 'rotating-file-stream';

export default function (app) {
    switch (process.env.NODE_ENV) {
        case 'development':
            app.use(morgan('dev'));
            break;
        case 'production':
            app.use(morgan('combined'));

            const requestLogStream = createStream('request-log.txt', {
                interval: '1d',
                path: join(process.cwd(), 'logs')
            })

            app.use(morgan('combined', { stream: requestLogStream }))
        default:
            break;
    }
}