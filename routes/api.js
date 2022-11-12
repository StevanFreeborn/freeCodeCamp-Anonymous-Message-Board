import ThreadController from '../controllers/api/threadController.js';
import ReplyController from '../controllers/api/replyController.js';
import BoardController from '../controllers/api/boardController.js';

export default function (app) {
  // Boards
  app.get('/api/boards', BoardController.getBoards);
  app.post('/api/boards', BoardController.createBoard);

  // Threads
  app.get('/api/threads/:board', ThreadController.getThreadsByBoardName);
  app.post('/api/threads/:board', ThreadController.createThread);
  app.put('/api/threads/:board', ThreadController.reportThreadById);
  app.delete('/api/threads/:board', ThreadController.deleteThreadById);

  // Replies
  app.get('/api/replies/:board', ReplyController.getRepliesByThreadId);
  app.post('/api/replies/:board', ReplyController.createReply);
  app.put('/api/replies/:board', ReplyController.reportReplyById);
  app.delete('/api/replies/:board', ReplyController.deleteReplyById);
}
