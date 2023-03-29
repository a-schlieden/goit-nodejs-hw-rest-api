
const request = require("supertest");
const app = require("../../app");

describe("test login controller", () => {
  beforeAll(() => app.listen(3000));

  test("Testing status, Object user und token ", async () => {
    const data = {
      email: "user@example.com",
      password: "123456",
    };
    const responce = await request(app).post("/api/auth/login").send(data);
    console.log("Status ", responce.status);
    console.log("Body ", responce.body);
  }, 3000);
});
