import HomeController from '../controllers/homeController.js';
import BoardController from '../controllers/boardController.js';
import ThreadController from '../controllers/threadController.js';

export default function (app) {
    app.get('/', HomeController.index);
    app.get('/playground', HomeController.playground);
    
    app.get('/b/:board/', BoardController.index);
    app.get('/b/:board/:threadid', ThreadController.index);
};