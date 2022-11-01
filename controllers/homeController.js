class HomeController {
    index = async (req, res) => {
        res.sendFile(process.cwd() + '/views/index.html');
    }
}

module.exports = HomeController;