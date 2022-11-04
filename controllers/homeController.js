export default class HomeController {
    static index = async (req, res) => {
        res.sendFile(process.cwd() + '/views/index.html');
    }
}