import Board from '../models/board.js';

export default class BoardService {
    static getBoardByName = async (boardName) => {
        return await Board.findOne({ name: boardName, }).exec();
    }
    
    static createBoard = async (boardName) => {
        return await new Board({ name: boardName, }).save();
    }
}