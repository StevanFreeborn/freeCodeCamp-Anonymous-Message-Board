export default class PingController {
    static ping = (req, res) => {
        return res.status(200).json({ message: 'still alive' });
    }
}