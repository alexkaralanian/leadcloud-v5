process.env.NODE_ENV = "test";

// const request = require("supertest");
// const session = require("supertest-session");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js");
chai.use(chaiHttp);

const Users = require("../db/models").users;

describe("Auth Route", () => {

  // afterEach(done => {
  //   Users.sync({ force: true });
  //   done();
  // });

  it("Current-user returns a 200 response", done => {
    chai
      .request(app)
      .get("/api/auth/current-user")
      .end((error, response) => {
        if (error) done(error);
        expect(response).to.have.status(200);
        done();
      });
  });

  it("Current-user returns null if user not authenticated", done => {
    chai
      .request(app)
      .get("/api/auth/current-user")
      .end((error, response) => {
        if (error) done(error);
        expect(response.body).to.equal(null);
        done();
      });
  });

  // it("Returns a user object with no tokens if user exists", done => {
  //   // Need to mock the session with the created user's ID.
  //   Users.create({
  //     googleId: "1234567890",
  //     email: "satoshi@gmx.com",
  //     username: "Satoshi Nakomoto",
  //     firstName: "Satoshi",
  //     lastName: "Nakomoto",
  //     googlePhoto: "http://somephoto.com",
  //     googleAccessToken: "access_token",
  //     googleRefreshToken: "refresh_token"
  //   })
  //   .then(() => {
  //     chai
  //       .request(app)
  //       .get("/api/auth/current-user")
  //       .end((error, response) => {
  //         if (error) done(error);
  //         console.log('RESPONSE', response.body)
  //         // returns an object without private tokens.
  //         expect(response.body).to.deep.equal({
  //           createdAt: response.createdAt,
  //           googleId: "1234567890",
  //           email: "satoshi@gmx.com",
  //           username: "Satoshi Nakomoto",
  //           firstName: "Satoshi",
  //           lastName: "Nakomoto",
  //           googlePhoto: "http://somephoto.com"
  //         });
  //       });
  //   })
  //   .then(()=> {
  //      Users.sync({ force: true });
  //       done();
  //   })
  // });

  it("Logout returns  200 response", done => {
    chai
      .request(app)
      .get("/api/auth/logout")
      .end((error, response) => {
        if (error) done(error);
        expect(response).to.have.status(200);
        done();
      });
  });
});
