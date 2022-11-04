import Thread from '../models/thread.js';

export default class ThreadService {
    static getThreadById = async (threadId) => {
        return await Thread.findById(threadId).exec();
    }   

    static createThread = async (boardId, text, hashedPassword) => {
        return await new Thread({
            board: boardId,
            text: text,
            delete_password: hashedPassword,
        }).save();
    }
}