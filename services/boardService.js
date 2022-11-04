const Board = require('../models/board.js');

class BoardService {
    getBoardByName = async (boardName) => {
        return await Board.findOne({ name: boardName }).exec();
    }
    
    createBoard = async (boardName) => {
        return await new Board({ name: boardName }).save();
    }
}

module.exports = BoardService;