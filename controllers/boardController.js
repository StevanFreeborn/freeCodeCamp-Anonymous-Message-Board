export default class BoardController {
  static index = async (req, res, next) =>
    res.sendFile(process.cwd() + '/views/board.html');
}
