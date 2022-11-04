import Thread from '../models/thread.js';

export default class ThreadService {
    getThreadById = async (threadId) => {
        return await Thread.findById(threadId).exec();
    }   

    createThread = async (boardId, text, hashedPassword) => {
        return await new Thread({
            board: boardId,
            text: text,
            delete_password: hashedPassword,
        }).save();
    }
}