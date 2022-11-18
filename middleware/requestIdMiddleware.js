export default function (app) {
  app.use((req, res, next) => req.id);
}
