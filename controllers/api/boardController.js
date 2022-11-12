import BoardDto from '../../dtos/boardDto.js';
import BoardService from '../../services/boardService.js';

export default class BoardController {
  static getBoards = async (req, res) => {
    const boards = await BoardService.getBoards();
    const boardDtos = boards.map(board => new BoardDto(board));

    return res.status(200).json(boardDtos);
  };

  static createBoard = async (req, res) => {
    const { name } = req.body;
    let board = await BoardService.getBoardByName(name);

    if (board != null) {
      return res
        .status(400)
        .json({ error: `Board with name ${name} already exists` });
    }

    board = await BoardService.createBoard(name);
    const boardDto = new BoardDto(board);

    return res.status(201).json(boardDto);
  };
}
