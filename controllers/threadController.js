class ThreadController {
    index = async (req, res) => {
        res.sendFile(process.cwd() + '/views/thread.html');
    }
}