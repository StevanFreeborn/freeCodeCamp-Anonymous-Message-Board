const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function () {
    const app = express();
    app.use('/public', express.static(process.cwd() + '/public'));
    app.use(cors({ origin: '*' }));
    app.use(bodyParser.urlencoded({ extended: true }));

    return app;
}