process.env.NODE_ENV = "test";

// const request = require("supertest");
// const session = require("supertest-session");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js");
chai.use(chaiHttp);

describe("Auth Route", () => {
  it("Returns a 200 response", done => {
    chai
      .request(app)
      .get("/api/auth/current-user")
      .end((error, response) => {
        if (error) done(error);
        expect(response).to.have.status(200);
        done();
      });
  });

  // NEED TO MOCK THE SESSION?? Does that even make sense to do?
  // Need a specialized middleware.
  // All the auth routes reference the req.user object (req.session.passport.user to be exact), which is put on the session by Passport.

  // Actually shoudl return NULL, as req.isAuthenticated() will return null of the req.user session object

  // it("If user does not exists it responds with an empty object", done => {
  //   chai
  //     .request(app)
  //     .get("/api/auth/current-user")
  //     .end((error, response) => {
  //       if (error) done(error);
  //       expect(response.body).to.be.deep.equal({});
  //       done();
  //     });
  // });
});
