import Thread from '../models/thread.js';

export default class ThreadService {
    static getThreadById = async (threadId) => {
        return await Thread.findById(threadId).exec();
    }

    static getThreadsByBoardId = async (boardId) => {
        return await Thread
        .find({ board: boardId, })
        .populate({ 
            path: 'replies',
            perDocumentLimit: 3,
            options: {
                sort: { bumped_on: 'desc' },
            }
        })
        .sort({ bumped_on: 'desc', })
        .limit(10)
        .exec();
    }

    static createThread = async (boardId, text, hashedPassword) => {
        return await new Thread({
            board: boardId,
            text: text,
            delete_password: hashedPassword,
        }).save();
    }
}