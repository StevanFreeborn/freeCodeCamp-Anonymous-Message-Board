'use strict';

module.exports = function (app) {
  app.get('/api/threads/:board');
  app.get('/api/replies/:board');
};
