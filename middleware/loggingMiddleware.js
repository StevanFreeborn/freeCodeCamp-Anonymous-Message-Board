import morgan from 'morgan';
import { join } from 'path';
import { createStream } from 'rotating-file-stream';

export default function (app) {
    if (process.env.NODE_ENV == 'development') {
        app.use(morgan('dev'));
    }
    else {
        app.use(morgan('combined'));

        const requestLogStream = createStream('request-log.txt', {
            interval: '1d',
            path: join(process.cwd(), 'logs')
        })
    
        app.use(morgan('combined', { stream: requestLogStream }))
    }
}