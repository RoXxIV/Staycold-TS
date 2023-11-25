/**
 * @fileoverview Defines the service for sending emails.
 * @module NodemailerConfig
 * @description Defines the service for sending emails.
 * @requires nodemailer - Nodemailer module.
 * @requires dotenv - Loads environment variables from a .env file into process.env.
 * @exports sendActivationMail - Sends an activation email to a new user.
 * @exports sendResetPasswordMail - Sends a password reset email to a user.
 * @see {@link https://nodemailer.com/about/|Nodemailer}
 * @see {@link https://www.npmjs.com/package/nodemailer|nodemailer}
 */

// import dependencies
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

/**
 * @constant {object} transporter
 * @description The transporter object that will be used to send emails.
 * @see {@link https://www.npmjs.com/package/nodemailer|nodemailer}
 * @example
 * const transporter = nodeMailer.createTransport({
 * service: "gmail",
 * auth: {
 *    user: process.env.EMAIL_USER,
 *   pass: process.env.EMAIL_PASS,
 * },
 */
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * @function sendActivationMail
 * @async
 * @description Sends an activation email to a new user - This function is called when a new user signs up.
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
                    <a href="${process.env.CLIENT_URL}/confirm-mail-redirection/${confirmationCode}">Activer mon compte</a>
                </body>`,
    });
  } catch (err) {
    // console.error("Failed to send activation email:", err); // debug line
    throw err;
  }
};

/**
 * @function sendResetPasswordMail
 * @async
 * @description Sends a password reset email to a user - This function is called when a user clicks on the "Forgot password" button.
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
    // console.error("Failed to send password reset email:", err); // debug line
    throw err;
  }
};

/**
 * @function sendContactMail
 * @async
 * @description Sends the content of the contact form to a Staycold email.
 * @param {string} contact - The contact information of the user.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The message content.
 * @throws {Error} Throws an error if the email sending fails.
 */
module.exports.sendContactMail = async (contact, subject, message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Formulaire de contact</title>
          </head>
          <body>
            <div style="font-family: Arial, sans-serif;">
              <h1 style="color: #333366;">Nouveau formulaire de contact</h1>
              <hr>
              <h2>Contact Information</h2>
              <p>${contact}</p>
              <h2>Message</h2>
              <p>${message}</p>
            </div>
          </body>
        </html>
      `,
    });
    console.log("Email sent successfully.");
  } catch (err) {
    console.error("An error occurred while sending the email:", err);
    throw err;
  }
};
