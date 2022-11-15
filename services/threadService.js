import Thread from '../models/thread.js';

export default class ThreadService {
  static getThreadById = async threadId => {
    return await Thread.findById(threadId)
      .populate({
        path: 'replies',
        options: {
          sort: { bumped_on: 'desc' },
        },
      })
      .exec();
  };

  static getThreadsByBoardId = async (
    boardId,
    threadLimit = 10,
    replyLimit = 3
  ) => {
    return await Thread.find({ board: boardId })
      .populate({
        path: 'replies',
        perDocumentLimit: replyLimit,
        options: {
          sort: { bumped_on: 'desc' },
        },
      })
      .sort({ bumped_on: 'desc' })
      .limit(threadLimit)
      .exec();
  };

  static createThread = async (boardId, text, hashedPassword) => {
    return await new Thread({
      board: boardId,
      text: text,
      delete_password: hashedPassword,
    }).save();
  };

  static deleteThreadById = async threadId => {
    return await Thread.deleteOne({ _id: threadId }).exec();
  };
}
