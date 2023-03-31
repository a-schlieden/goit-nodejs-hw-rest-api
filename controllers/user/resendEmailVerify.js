
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { sendEmail } = ("../../helpers");


const resendEmailVerify = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        const error = new Error(`missing required field email`);
        error.status = 400;
        throw error;
    }

    const userByMail = await User.findOne({ email });

    if (!userByMail.verify) {
        const verificationToken = nanoid();
        const verificationMail = {
            to: email,
            subject: "Verification Email",
            html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}" >Click to confirm</a>`,
        }
        await sendEmail(verificationMail);
        await User.findByIdAndUpdate(userByMail._id, { verificationToken: null, verify: true });
        res.json({
            status: "success",
            code: 200,
            message: "Verification email sent",
        });

    }

    res.json({
        messge: "Verification has already been passed",
    });



};

module.exports = resendEmailVerify;