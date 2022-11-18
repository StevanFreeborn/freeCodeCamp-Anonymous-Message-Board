export default function (app) {
  app.use((req, res, next) =>
    res.status(404).sendFile(process.cwd() + '/views/404.html')
  );
}
