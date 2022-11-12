import ThreadService from '../../services/threadService.js';
import HashService from '../../services/hashService.js';
import ReplyService from '../../services/replyService.js';
import ReplyDto from '../../dtos/replyDto.js';
import ThreadDto from '../../dtos/threadDto.js';

export default class ReplyController {
  static getRepliesByThreadId = async (req, res) => {
    const { thread_id } = req.query;
    const thread = await ThreadService.getThreadById(thread_id);

    if (thread == null) {
      return res
        .status(400)
        .json({ error: `Thread with id ${thread_id} not found` });
    }

    const threadDto = new ThreadDto(thread);

    return res.status(200).json(threadDto);
  };

  static createReply = async (req, res) => {
    const { thread_id, text, delete_password } = req.body;
    const thread = await ThreadService.getThreadById(thread_id);

    if (thread == null) {
      return res
        .status(400)
        .json({ error: `Thread with id ${thread_id} not found` });
    }

    const hash = await HashService.hash(delete_password);
    const reply = await ReplyService.createReply(thread.id, text, hash);

    thread.replies.push(reply.id);
    await thread.save();

    const replyDto = new ReplyDto(reply);

    return res.status(201).json(replyDto);
  };

  static reportReplyById = async (req, res) => {
    const { reply_id } = req.body;
    const reply = await ReplyService.getReplyById(reply_id);

    if (reply == null) {
      return res
        .status(400)
        .json({ error: `Reply with id ${reply_id} not found` });
    }

    reply.reported = true;
    await reply.save();

    return res.status(200).type('text').send('reported');
  };

  static deleteReplyById = async (req, res) => {
    const { reply_id, delete_password } = req.body;
    const reply = await ReplyService.getReplyById(reply_id);

    if (reply == null) {
      return res
        .status(400)
        .json({ error: `Reply with id ${reply_id} not found` });
    }

    const isCorrectPassword = await HashService.compare(
      delete_password,
      reply.delete_password
    );

    if (isCorrectPassword == false) {
      return res.status(400).type('text').send('incorrect password');
    }

    const replyDeletion = await ReplyService.deleteReplyById(reply.id);

    if (replyDeletion.acknowledged == false) {
      return res
        .status(400)
        .json({ error: `Unable to delete reply with id ${reply.id}` });
    }

    return res.status(200).type('text').send('success');
  };
}
