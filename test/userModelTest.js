process.env.NODE_ENV = "test";

const Users = require("../db/models").users;
const expect = require("chai").expect;

describe("Users Model", () => {
  // beforeEach(done => {
  //   Users.create({
  //     firstName: "alex",
  //     email: "alex.karalanian@gmail.com"
  //   });
  //   done();
  // });
  // afterEach(done => {
  //   Users.sync({ force: true });
  //   done();
  // });
  // it("Gets user", done => {
  //   Users.findOne({
  //     where: {
  //       email: "alex.karalanian@gmail.com"
  //     }
  //   }).then(user => {
  //     expect(user.email).to.equal("alex.karalanian@gmail.com");
  //     done();
  //   });
  // });
});
