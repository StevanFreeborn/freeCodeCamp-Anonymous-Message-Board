import chaiHttp from "chai-http";
import chai from "chai";

chai.use(chaiHttp);

export default function (server) {
  return setInterval(() => {
    chai
    .request(server)
    .get('/api/ping')
    .end((err, res) => {
      if (err) console.log(err);
      console.log(res.body);
    });
  }, 15 * 60000)
}
