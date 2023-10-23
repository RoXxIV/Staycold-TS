/**
 * @module EmailService
 * @requires nodemailer
 * @requires dotenv
 */
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

/**
 * @typedef {Object} AuthCredentials
 * @property {string} user - The email address used for sending emails.
 * @property {string} pass - The password associated with the email address.
 */
/**
 * SMTP settings for sending emails.
 * @type {import("nodemailer").Transporter}
 */
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an activation email to a new user.
 *
 * @function
 * @async
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} confirmationCode - The confirmation code for activating the user account.
 * @throws Will throw an error if the email fails to send.
 * @example
 * sendActivationMail('John', 'john@example.com', '123456');
 */
module.exports.sendActivationMail = async (name, email, confirmationCode) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "❄ Activation du compte sur Staycold ❄",
      html: `<html>
                <head>
                    <title>Activation du compte</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align:center;
                            color:#2c3138;
                        }
                        p {
                            font-size: 1.1em;
                        }
                        a {
                            background-color: #3b82f6;
                            color: white;
                            padding: 14px 20px;
                            margin-top:20px
                            cursor: pointer;
                            text-decoration: none;
                            display: inline-block;
                            font-size: 16px;
                            font-weight:bold;
                            transition-duration: 0.4s;
                            cursor: pointer;
                        }
                        a:hover {
                            background-color: #065ae2;
                        }
                    </style>
                </head>
                <body>
                    <h1>Bonjour ${name},</h1>
                    <h2>Merci de vous être inscrit sur <span>Staycold</span></h2>
                    <h3>Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</h3>
                    <a href="${process.env.CLIENT_URL}/activate/${confirmationCode}">Activer mon compte</a>
                </body>`,
    });
    console.log(`Activation email sent to ${email}`);
  } catch (err) {
    console.error("Failed to send activation email:", err);
    throw err;
  }
};
