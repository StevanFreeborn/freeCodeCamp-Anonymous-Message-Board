export default class BoardController {
  static index = async (req, res) => {
    res.sendFile(process.cwd() + '/views/board.html');
  };
}
