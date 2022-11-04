import Board from '../models/board.js';

export default class BoardService {
    getBoardByName = async (boardName) => {
        return await Board.findOne({ name: boardName }).exec();
    }
    
    createBoard = async (boardName) => {
        return await new Board({ name: boardName }).save();
    }
}