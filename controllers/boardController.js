export default class BoardController {
    index = async (req, res) => {
        res.sendFile(process.cwd() + '/views/board.html');
    }
}