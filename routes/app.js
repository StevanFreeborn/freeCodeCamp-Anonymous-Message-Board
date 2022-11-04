import HomeController from '../controllers/homeController.js';
import BoardController from '../controllers/boardController.js';
import ThreadController from '../controllers/threadController.js';

const homeController = new HomeController();
const boardController = new BoardController();
const threadController = new ThreadController();

export default function (app) {
    app.get('/', homeController.index);
    app.get('/b/:board/', boardController.index);
    app.get('/b/:board/:threadid', threadController.index);
};