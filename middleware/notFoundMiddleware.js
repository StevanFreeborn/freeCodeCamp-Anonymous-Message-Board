export default function (app) {
    app.use((req, res, next) => res.status(404).type('text').send('Not Found'));
}