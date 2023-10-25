/**
 * @module EmailService
 * @description Defines the service for sending emails.
 * @requires nodemailer
 * @requires dotenv
 * @exports sendActivationMail
 * @exports sendResetPasswordMail
 * @see {@link https://nodemailer.com/about/|Nodemailer}
 * @see {@link https://www.npmjs.com/package/nodemailer|nodemailer}
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
 * @description This function is called when a new user signs up.
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

/**
 * Sends a password reset email to a user.
 * @description This function is called when a user clicks on the "Forgot password" button.
 * @function
 * @async
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} resetCode - The password reset code.
 * @throws Will throw an error if the email fails to send.
 * @example
 * sendResetPasswordMail('John', '...@example.com', '123456');
 */
module.exports.sendResetPasswordMail = async (name, email, resetCode) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "❄ Réinitialisation du mot de passe sur Staycold ❄",
      html: `<div>
        <h1>❄ Bonjour ${name} ❄</h1>
        <p>Il semble que vous ayez besoin d'un nouveau mot de passe. Cliquez sur le lien ci-dessous pour confirmer votre demande.</p>
        <br />
        <a href=http://127.0.0.1:5173/reset-password/${resetCode}>➡ Confirmer votre demande ⬅</a>
        <br />
        <p>Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.</p>
        <p>À bientôt, <br />
        L'équipe StayCold</p>
        </div>`,
    });
  } catch (err) {
    console.error("Failed to send password reset email:", err);
    throw err;
  }
};
