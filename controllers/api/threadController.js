import BoardService from '../../services/boardService.js';
import HashService from '../../services/hashService.js';
import ThreadService from '../../services/threadService.js';
import CreateThreadDto from '../../dtos/createThreadDto.js';

const boardService = new BoardService();
const threadService = new ThreadService();

export default class ThreadController {
    getThreadsByBoardName = async (req, res) => {
        return res.status(500).json({ message: 'not implemented' });
    }

    createThread = async (req, res) => {
        const boardName = req.params.board;
        const { text, delete_password, } = req.body;

        let board = await boardService.getBoardByName(boardName);

        if (board == null) {
            board = await boardService.createBoard(boardName);
        }

        const hash = await HashService.hash(delete_password);

        const thread = await threadService.createThread(board.id, text, hash);
        
        board.threads.push(thread.id)
        await board.save();

        const createThreadDto = new CreateThreadDto(thread);

        return res.status(201).json(createThreadDto);
    }
}