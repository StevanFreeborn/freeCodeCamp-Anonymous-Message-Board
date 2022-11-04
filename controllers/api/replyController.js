import ThreadService from "../../services/threadService.js";
import HashService from "../../services/hashService.js";
import ReplyService from "../../services/replyService.js";
import CreateReplyDto from "../../dtos/createReplyDto.js";

const threadService = new ThreadService();
const replyService = new ReplyService();

export default class ReplyController {
    createReply = async (req, res) => {
        const { thread_id, text, delete_password } = req.body;
        
        const thread = await threadService.getThreadById(thread_id);
        
        if (thread == null) {
            return res.status(400).json({ error: `Thread with id ${thread_id} not found`});
        }

        const hash = await HashService.hash(delete_password);

        const reply = await replyService.createReply(thread.id, text, hash);
        
        thread.replies.push(reply.id);
        await thread.save();

        const createReplyDto = new CreateReplyDto(reply);

        return res.status(201).json(createReplyDto);
    }
}