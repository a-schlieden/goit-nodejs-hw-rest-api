
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_APIKEY } = process.env;

sgMail.setApiKey(SENDGRID_APIKEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "alex.schlieden@gmail.com" }
    try {
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw error;
    }
}

module.exports = sendEmail;

