const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
require('dotenv').config();

function hashString(string) {
    const saltRounds = 10;
    const secretKey = process.env.SECRET_KEY;
    const hashedString = bcrypt.hashSync(string + secretKey, saltRounds);
    return hashedString;
}

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

module.exports = {
    hashString,
    transporter
};