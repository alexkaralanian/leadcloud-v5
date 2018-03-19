"use strict";

process.env.NODE_ENV = "test";
const sequelize = require("../db/models").sequelize;
const Users = require("../db/models").users;

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../index.js");

describe("Current User", () => {
  beforeEach(done => {
    Users.create({
      firstName: "alex",
      email: "alex.karalanian@gmail.com"
    });
    done();
  });

  afterEach(done => {
    Users.sync({ force: true });
    done();
  });

  it("Gets user", done => {
    Users.findOne({
      where: {
        email: "alex.karalanian@gmail.com"
      }
    }).then(user => {
      expect(user.email).to.equal("alex.karalanian@gmail.com");
      done();
    });
  });
});
