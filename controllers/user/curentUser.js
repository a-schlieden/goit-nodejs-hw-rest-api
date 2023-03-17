const { User, schemas } = require("../../models/user");
//const { userAuthInfo } = require("../../middlewares");

const getCurrentUser = async (req, res, next) => {
    const { email, name } = req.user;
    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
                name,
                email,
            }
        },
    })
}

module.exports = getCurrentUser;