import ThreadController from '../controllers/api/threadController.js';
const threadController = new ThreadController();

export default function (app) {
  app.post('/api/threads/:board', threadController.createThread);
  app.get('/api/threads/:board');
  app.get('/api/replies/:board');
};
