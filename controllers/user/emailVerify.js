
const { User } = require("../../models/user");

const emailVerify = async (req, res, next) => {
    const { verificationToken } = req.params;
    const userByToken = await User.findOne({ verificationToken });

    if (!userByToken) {
        const error = new Error(`User not found`);
        error.status = 404;
        throw error;
    }

    await User.findByIdAndUpdate(userByToken._id, { verificationToken: null, verify: true });

    res.json({
        status: "success",
        code: 200,
        messge: "Verification successful",
    });
};

module.exports = emailVerify;