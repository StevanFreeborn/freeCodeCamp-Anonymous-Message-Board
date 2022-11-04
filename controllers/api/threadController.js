class ThreadController {
    createThread = async (req, res) => {
        const { board } = req.params;
        return res.status(201).json({ message: board });
    }
}

module.exports = ThreadController;