'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRoutes = require('./routes/api.js');
const appRoutes = require('./routes/app.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const helmet = require('helmet');

const app = express();

app.use(
  helmet.frameguard({
    action: 'sameorigin',
  })
);

app.use(
  helmet.dnsPrefetchControl({
    allow: false,
  })
);

app.use(
  helmet.referrerPolicy({
    policy: ['same-origin'],
  })
);

app.use('/public', express.static(process.cwd() + '/public'));

app.use(
  cors({ 
    origin: '*' 
  })
);

app.use(
  bodyParser.urlencoded({ 
    extended: true 
  })
);

fccTestingRoutes(app);
apiRoutes(app);
appRoutes(app);

app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(() => {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 1500);
  } 
});

module.exports = app;
