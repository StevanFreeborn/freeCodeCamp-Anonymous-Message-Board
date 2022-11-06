import ThreadController from '../controllers/api/threadController.js';
import ReplyController from '../controllers/api/replyController.js';

export default function (app) {
  // Threads
  app.get('/api/threads/:board', ThreadController.getThreadsByBoardName);
  app.post('/api/threads/:board', ThreadController.createThread);
  app.put('/api/threads/:board', ThreadController.reportThread);
  app.delete('/api/threads/:board');
  
  // Replies
  app.get('/api/replies/:board', ReplyController.getRepliesByThreadId);
  app.post('/api/replies/:board', ReplyController.createReply);
  app.put('/api/replies/:board', ReplyController.reportReply);
  app.delete('/api/replies/:board');
};
