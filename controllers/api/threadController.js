import BoardService from '../../services/boardService.js';
import HashService from '../../services/hashService.js';
import ThreadService from '../../services/threadService.js';
import ThreadDto from '../../dtos/threadDto.js';

export default class ThreadController {
    static getThreadsByBoardName = async (req, res) => {
        const boardName = req.params.board;
        const board = await BoardService.getBoardByName(boardName);

        if (board == null) {
            return res.status(404).json({ error: `No board with name ${boardName} found`});
        }

        const threads = await ThreadService.getThreadsByBoardId(board.id);
        const threadDtos = threads.map(thread => new ThreadDto(thread));

        return res.status(200).json(threadDtos);
    }

    static createThread = async (req, res) => {
        const boardName = req.params.board;
        const { text, delete_password, } = req.body;

        let board = await BoardService.getBoardByName(boardName);

        if (board == null) {
            board = await BoardService.createBoard(boardName);
        }
        
        const hash = await HashService.hash(delete_password);

        const thread = await ThreadService.createThread(board.id, text, hash);
        
        board.threads.push(thread.id)
        await board.save();

        const threadDto = new ThreadDto(thread);

        return res.status(201).json(threadDto);
    }
}