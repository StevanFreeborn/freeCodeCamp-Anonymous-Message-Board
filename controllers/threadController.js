export default class ThreadController {
    static index = async (req, res) => {
        res.sendFile(process.cwd() + '/views/thread.html');
    }
}