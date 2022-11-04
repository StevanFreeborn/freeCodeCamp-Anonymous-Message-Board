const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');

module.exports = function (app) {
    if (process.env.NODE_ENV == 'development') {
        app.use(morgan('dev'));
    }
    else {
        app.use(morgan('combined'));

        const requestLogStream = rfs.createStream('request-log.txt', {
            interval: '1d',
            path: path.join(process.cwd(), 'logs')
        })
    
        app.use(morgan('combined', { stream: requestLogStream }))
    }
}