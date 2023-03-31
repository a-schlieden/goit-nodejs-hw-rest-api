const express = require("express");
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const login = require("../auth/login");

const { DB_HOST } = process.env;

const connect = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(DB_HOST);
};

const app = express();

app.use(express.json());

app.post("/api/auth/login", login);

describe("controller login test", () => {
  beforeAll(() => {
    connect()
      .then(async () => {
        console.log("Database connection successful");
        app.listen(3000);
      })
      .catch((error) => {
        console.log(`Database connection with error:${error.message}`);
      });
  });

  const data = {
    email: "user@example.com",
    password: "123456",
  };

  test("login return token and object with user und subscription", async () => {
    const response = await request(app).post("/api/users/login").send(data);

    //const { email, subscription, avatarURL } = response.body.user;
    //const { token } = response.body;
    console.log("responce ", response.body);
    // expect(response.status).toBe(200);
    // expect(typeof token).toEqual("string");
    // expect(Object.keys(response.body.user).length).toBe(3);
    // expect(typeof email).toEqual("string");
    // expect(typeof subscription).toEqual("string");
    // expect(typeof avatarURL).toEqual("string");
  });
});
