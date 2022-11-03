'use strict';
const ThreadController = require('../controllers/api/threadController.js');
const threadController = new ThreadController();

module.exports = function (app) {
  app.post('/api/threads/:board', threadController.createThread);
  app.get('/api/threads/:board');
  app.get('/api/replies/:board');
};
