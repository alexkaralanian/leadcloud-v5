"use strict";

process.env.NODE_ENV = "test";
const sequelize = require("../db/models").sequelize;
const Users = require("../db/models").users;

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../index.js");

describe("Curren User", () => {
  // RESET MODEL AFTER EACH TEST
  afterEach(done => {
    Users.sync({ force: true });
    done();
  });

  it("Gets current user", done => {
    Users.create({
      email: "alex.karalanian@gmail.com"
    }).then(user => {
      console.log("hi");
      done();
    });
  });
});
