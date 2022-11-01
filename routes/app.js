'use strict';
const HomeController = require('../controllers/homeController');
const BoardController = require('../controllers/boardController');
const ThreadController = require('../controllers/threadController');

const homeController = new HomeController();
const boardController = new BoardController();
const threadController = new ThreadController();

module.exports = function (app) {
    app.get('/', homeController.index);
    app.get('/b/:board/', boardController.index);
    app.get('/b/:board/:threadid', threadController.index);
};