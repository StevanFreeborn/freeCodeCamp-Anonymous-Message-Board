import Reply from "../models/reply.js";

export default class ReplyService {
    static getReplyById = async (replyId) => {
        return await Reply.findById(replyId).exec();
    }

    static createReply = async (threadId, text, hashedPassword) => {
        return await new Reply({
            thread: threadId,
            text: text,
            delete_password: hashedPassword,
        }).save();
    }
}