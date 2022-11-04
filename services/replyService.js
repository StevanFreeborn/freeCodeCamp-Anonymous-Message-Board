import Reply from "../models/reply.js";

export default class ReplyService {
    createReply = async (threadId, text, hashedPassword) => {
        return await new Reply({
            thread: threadId,
            text: text,
            delete_password: hashedPassword,
        }).save();
    }
}