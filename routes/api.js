import ThreadController from '../controllers/api/threadController.js';
import ReplyController from '../controllers/api/replyController.js';

export default function (app) {
  // Threads
  app.get('/api/threads/:board', ThreadController.getThreadsByBoardName);
  app.post('/api/threads/:board', ThreadController.createThread);
  
  // Replies
  app.get('/api/replies/:board', ReplyController.getRepliesByThreadId);
  app.post('/api/replies/:board', ReplyController.createReply);
};
