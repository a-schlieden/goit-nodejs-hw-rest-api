// const express = require('express');
// const request = require("supertest");
// const { response } = require('../../app');
// const login = require("../auth/login")

// const app = express("api/users/login", login)

// app.post()

// describe("test login controller", () => {

//     beforeAll(() => { app.listen(3000) });
//     afterAll(() => { app.exit(1) });

//     test("login", async () => {
//         const responce = await request(app).post("api/users/login")
//         expect(responce.status).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);

//         const { user } = responce.body
//         expect(typeof user).toBe("object");
//         expect(typeof user.email).toBe("string");
//         expect(typeof user.subscription).toBe("string");
//     })
// })

// process.exit(1);
//////////////////////////////////////////////////////////////////////////

const request = require("supertest");
const app = require("../../app")
//const login = require("../auth/login")

describe("test login controller", () => {

    beforeAll(() => { app.listen(3000) });
    afterAll(async () => { await app.close() });

    test("login", async () => {

        const data = {
            email: "testuser3@mail.com",
            paddword: "123456"
        }

        const responce = await request(app).post("api/users/login").send(data)
        expect(responce.statusCode).toBe(200);

        expect(responce.body).toEqual(
            expect.objectContaining({
                token: expect.any(String),
                user: expect.any(Object),
            })
        )
        const { user } = responce.body
        expect(typeof user.email).toBe("string");
        expect(typeof user.subscription).toBe("string");

    })
})