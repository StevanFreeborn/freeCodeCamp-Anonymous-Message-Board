import BoardService from '../../services/boardService.js';
import HashService from '../../services/hashService.js';
import ThreadService from '../../services/threadService.js';
import ThreadDto from '../../dtos/threadDto.js';
import ReplyService from '../../services/replyService.js';

export default class ThreadController {
  static getThreadsByBoardName = async (req, res) => {
    const boardName = req.params.board;
    const board = await BoardService.getBoardByName(boardName);

    if (board == null) {
      return res
        .status(404)
        .json({ error: `No board with name ${boardName} found` });
    }

    const threads = await ThreadService.getThreadsByBoardId(board.id);
    const threadDtos = threads.map(thread => new ThreadDto(thread));

    return res.status(200).json(threadDtos);
  };

  static createThread = async (req, res) => {
    const boardName = req.params.board;
    const { text, delete_password } = req.body;
    let board = await BoardService.getBoardByName(boardName);

    if (board == null) {
      board = await BoardService.createBoard(boardName);
    }

    const hash = await HashService.hash(delete_password);
    const thread = await ThreadService.createThread(board.id, text, hash);

    board.threads.push(thread.id);
    await board.save();

    const threadDto = new ThreadDto(thread);

    return res.status(201).json(threadDto);
  };

  static reportThreadById = async (req, res) => {
    let { thread_id, report_id } = req.body;

    // addresses bug in freeCodeCamp test where they are sending
    // the thread id in the body with property name of report_id.
    thread_id = thread_id ?? report_id;

    const thread = await ThreadService.getThreadById(thread_id);

    if (thread == null) {
      return res
        .status(400)
        .json({ error: `Thread with id ${thread_id} not found` });
    }

    thread.reported = true;
    await thread.save();

    return res.status(200).type('text').send('reported');
  };

  static deleteThreadById = async (req, res) => {
    const { thread_id, delete_password } = req.body;
    const thread = await ThreadService.getThreadById(thread_id);

    if (thread == null) {
      return res
        .status(400)
        .json({ error: `Thread with id ${thread_id} not found` });
    }

    const isCorrectPassword = await HashService.compare(
      delete_password,
      thread.delete_password
    );

    if (isCorrectPassword == false) {
      return res.status(400).type('text').send('incorrect password');
    }

    const threadDeletion = await ThreadService.deleteThreadById(thread.id);

    if (threadDeletion.acknowledged == false) {
      return res
        .status(400)
        .json({ error: `Unable to delete thread with id ${thread.id}` });
    }

    const repliesDeletion = await ReplyService.deleteRepliesByThreadId(
      thread.id
    );

    if (repliesDeletion.acknowledged == false) {
      return res.status(400).json({
        error: `Unable to delete the replies for thread with id ${thread.id}`,
      });
    }

    return res.status(200).type('text').send('success');
  };
}
