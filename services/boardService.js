import Board from '../models/board.js';

export default class BoardService {
    static getBoards = async () => {
        return await Board
        .find({})
        .sort({ bumped_on: 'desc', })
        .exec();
    }

    static getBoardByName = async (boardName) => {
        return await Board.findOne({ name: boardName, }).exec();
    }
    
    static createBoard = async (boardName) => {
        return await new Board({ name: boardName, }).save();
    }
}