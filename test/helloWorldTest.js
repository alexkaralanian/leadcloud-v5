const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../index.js");

describe("Hello World Route", () => {
  it("Returns a 200 response", done => {
    chai
      .request(app)
      .get("/")
      .end((error, response) => {
        if (error) done(error);
        expect(response).to.have.status(200);
        done();
      });
  });
  it('Returns a "Hello World" message', done => {
    chai
      .request(app)
      .get("/")
      .end((error, response) => {
        if (error) done(error);
        expect(response.body).to.be.deep.equal({
          message: "Hello, world!"
        });
        done();
      });
  });
});
