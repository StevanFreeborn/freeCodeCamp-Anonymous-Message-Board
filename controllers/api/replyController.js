import ThreadService from "../../services/threadService.js";
import HashService from "../../services/hashService.js";
import ReplyService from "../../services/replyService.js";
import ReplyDto from "../../dtos/replyDto.js";
import ThreadDto from "../../dtos/threadDto.js";

export default class ReplyController {
    static getRepliesByThreadId = async (req, res) => {
        const { thread_id } = req.query;
        const thread = await ThreadService.getThreadById(thread_id);

        if (thread == null) {
            return res.status(400).json({ error: `Thread with id ${thread_id} not found`});
        }

        const threadDto = new ThreadDto(thread);

        return res.status(200).json(threadDto);
    }

    static createReply = async (req, res) => {
        const { thread_id, text, delete_password } = req.body;
        const thread = await ThreadService.getThreadById(thread_id);
        
        if (thread == null) {
            return res.status(400).json({ error: `Thread with id ${thread_id} not found`});
        }

        const hash = await HashService.hash(delete_password);
        const reply = await ReplyService.createReply(thread.id, text, hash);
        
        thread.replies.push(reply.id);
        await thread.save();

        const replyDto = new ReplyDto(reply);

        return res.status(201).json(replyDto);
    }
}