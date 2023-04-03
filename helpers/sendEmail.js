const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_APIKEY } = process.env;

sgMail.setApiKey(SENDGRID_APIKEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "alex.schlieden@gmail.com" };
  try {
    await sgMail.send(email);
    console.log("Email send !!!");
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;

// sgMail.send(email)
//     .then(() => console.log("Email send !!!"));
// .catch ((error) => console.log(error.message));
