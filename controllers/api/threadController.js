const BoardService = require('../../services/boardService.js');
const boardService = new BoardService();

class ThreadController {
    createThread = async (req, res) => {
        const boardName = req.params.board;
        let board = await boardService.getBoardByName(boardName);

        if (board == null) {
            board = await boardService.createBoard(boardName);
        }

        return res.status(201).json({ board });
    }
}

module.exports = ThreadController;