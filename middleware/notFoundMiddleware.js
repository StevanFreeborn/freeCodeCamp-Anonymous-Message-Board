export default function (app) {
  app.use((req, res, next) => res.sendFile(process.cwd() + '/views/404.html'));
}
