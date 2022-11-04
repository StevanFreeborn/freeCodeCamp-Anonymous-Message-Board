import ThreadController from '../controllers/api/threadController.js';
import ReplyController from '../controllers/api/replyController.js';

const threadController = new ThreadController();
const replyController = new ReplyController();

export default function (app) {
  // Threads
  app.get('/api/threads/:board', threadController.getThreadsByBoardName);
  app.post('/api/threads/:board', threadController.createThread);
  
  // Replies
  app.get('/api/replies/:board');
  app.post('/api/replies/:board', replyController.createReply);
};
