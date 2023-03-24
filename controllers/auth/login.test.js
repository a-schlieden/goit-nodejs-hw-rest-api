
const express = require('express');
const request = require("supertest");
const { response } = require('../../app');
const login = require("./login")

const app = express("api/users/login", login)

app.post()

describe("test login controller", () => {

    beforeAll(() => { app.listen(3000) });
    afterAll(() => { app.exit(1) });

    test("login return code 200", async () => {
        const responce = await request(app).post("api/users/login")
        expect(responce.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const { user } = responce.body
        expect(typeof user.email).toBe("string");
        expect(typeof user.subscription).toBe("string");
    })
})

// process.exit(1);