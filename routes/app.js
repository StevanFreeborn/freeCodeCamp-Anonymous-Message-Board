import HomeController from '../controllers/homeController.js';
import BoardController from '../controllers/boardController.js';
import ThreadController from '../controllers/threadController.js';
import viewErrorCatcher from '../errors/viewErrorCatcher.js';

export default function (app) {
  app.get('/', viewErrorCatcher(HomeController.index));
  app.get('/playground', viewErrorCatcher(HomeController.playground));

  app.get('/b/:board/', viewErrorCatcher(BoardController.index));
  app.get('/b/:board/:threadid', viewErrorCatcher(ThreadController.index));
}
