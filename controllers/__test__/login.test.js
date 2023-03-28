//const express = require("express");

const request = require("supertest");
//const app = express();
const app = require("../../app");

//const login = require("../auth/login");
//app.post("/api/auth/login", login);

describe("test login controller", () => {
  beforeAll(() => app.listen(3000));

  test("Testing status, Object user und token ", async () => {
    //const responce = await request(app).post("api/auth/login").send(data);
    const data = {
      email: "user@example.com",
      password: "123456",
    };
    const responce = await request(app).post("/api/auth/login").send(data);
    console.log("Status ", responce.status);
    console.log("Body ", responce.body);

    //expect(responce.status).toBe(200);
    // expect(Array.isArray(response.body)).toBe(true);

    // const { user } = responce.body;
    // expect(typeof user).toBe("object");
    // expect(typeof user.email).toBe("string");
    // expect(typeof user.subscription).toBe("string");
  }, 3000);
});

//////////////////////////////////////////////////////////////////////////

// const request = require("supertest");
// // const { contactsControllers } = require("..");
// const app = require("../../app");
// //const login = require("../auth/login")

// describe("test login-controller", () => {
//   const { PORT = 3000 } = process.env;

//   beforeAll(() => {
//     app.listen(PORT);
//     console.log("Server Start");
//   });
//   afterAll(() => {
//     console.log("Server Stop");
//     // process.exit();
//   });

//   test("login #1", async () => {
//     const data = {
//       email: "user@mail.com",
//       paddword: "123456",
//     };

//     const responce = await request(app).post("api/auth/login").send(data);
//     console.log("res.Status: ", responce.status);
//     // expect(responce.statusCode).toBe(200);

//     // expect(responce.body).toEqual(
//     //   expect.objectContaining({
//     //     token: expect.any(String),
//     //     user: expect.any(Object),
//     //   })
//     // );
//     // const { user } = responce.body;
//     // expect(typeof user.email).toBe("string");
//     // expect(typeof user.subscription).toBe("string");
//   });
// });
