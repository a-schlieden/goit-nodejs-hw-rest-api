
//const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const SEKRET_KEY = process.env;
const { User } = require("../models")

const userAuthInfo = async (req, res) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    try {
        if (bearer !== "Bearer") {

        }
        const { id } = jwt.verify(token, SEKRET_KEY)
        const user = await User.findById(id)
        if (!user && !user.token) {

        }
        req.user = user
    }
    catch (error) {
        if (error.message === "Invalid sugnature") {
            error.status = 401;
        }
    }
}

module.exports = userAuthInfo;