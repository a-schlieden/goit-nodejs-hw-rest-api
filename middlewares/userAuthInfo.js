
//const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const SEKRET_KEY = process.env;

const userAuthInfo = async (req, res) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    const { id } = jwt.verify(token, SEKRET_KEY)
}

module.exports = userAuthInfo;