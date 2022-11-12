import Reply from '../models/reply.js';

export default class ReplyService {
  static getReplyById = async replyId => {
    return await Reply.findById(replyId).exec();
  };

  static createReply = async (threadId, text, hashedPassword) => {
    return await new Reply({
      thread: threadId,
      text: text,
      delete_password: hashedPassword,
    }).save();
  };

  static deleteRepliesByThreadId = async threadId => {
    return await Reply.deleteMany({ thread: threadId }).exec();
  };

  static deleteReplyById = async replyId => {
    return await Reply.updateOne(
      { _id: replyId },
      { text: '[deleted]' },
      { runValidators: true }
    ).exec();
  };
}
