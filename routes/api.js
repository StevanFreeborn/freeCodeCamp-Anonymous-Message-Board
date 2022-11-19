import ThreadController from '../controllers/api/threadController.js';
import ReplyController from '../controllers/api/replyController.js';
import BoardController from '../controllers/api/boardController.js';
import apiErrorCatcher from '../errors/apiErrorCatcher.js';
import PingController from '../controllers/api/pingController.js';
import { body } from 'express-validator';

export default function (app) {
  // Boards
  app.get('/api/boards', apiErrorCatcher(BoardController.getBoards));
  app.post(
    '/api/boards',
    body('name').escape(),
    apiErrorCatcher(BoardController.createBoard)
  );

  // Threads
  app.get(
    '/api/threads/:board',
    apiErrorCatcher(ThreadController.getThreadsByBoardName)
  );
  app.post(
    '/api/threads/:board',
    body('text').escape(),
    apiErrorCatcher(ThreadController.createThread)
  );
  app.put(
    '/api/threads/:board',
    apiErrorCatcher(ThreadController.reportThreadById)
  );
  app.delete(
    '/api/threads/:board',
    apiErrorCatcher(ThreadController.deleteThreadById)
  );

  // Replies
  app.get(
    '/api/replies/:board',
    apiErrorCatcher(ReplyController.getRepliesByThreadId)
  );

  app.post(
    '/api/replies/:board',
    body('text').escape(),
    apiErrorCatcher(ReplyController.createReply)
  );

  app.put(
    '/api/replies/:board',
    apiErrorCatcher(ReplyController.reportReplyById)
  );

  app.delete(
    '/api/replies/:board',
    apiErrorCatcher(ReplyController.deleteReplyById)
  );

  // Ping
  app.get('/api/ping', apiErrorCatcher(PingController.ping));
}
