import BoardService from '../../services/boardService.js';
const boardService = new BoardService();

export default class ThreadController {
    createThread = async (req, res) => {
        const boardName = req.params.board;
        const { text, delete_password, } = req.body;

        let board = await boardService.getBoardByName(boardName);

        if (board == null) {
            board = await boardService.createBoard(boardName);
        }

        

        return res.status(201).json({ text, delete_password, });
    }
}