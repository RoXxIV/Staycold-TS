/**
 * @module PasswordReset
 * @description Defines the service for sending emails.
 * @requires nodemailer
 * @requires bcryptjs
 * @requires ../models
 * @exports sendEmailResetPassword
 * @exports resetPassword
 * @see {@link https://nodemailer.com/about/|Nodemailer}
 */
const nodemailer = require("../plugins/nodemailer.config");
const db = require("../models");
var bcrypt = require("bcryptjs");

const User = db.user;

/**
 * Sends a password reset email to the user.
 * @description This function is called when the user clicks on the "Forgot password" button.
 * @async
 * @function
 * @param {Object} req - Express request object containing the user's email.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with a message indicating the email sending status.
 * @throws {Object} JSON response with a 401 status if the user is not found.
 * @throws {Object} JSON response with a 500 status if an error occurs.
 */
exports.sendEmailResetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Utilisateur non trouvé" });
    }

    await nodemailer.sendResetPasswordMail(
      user.username,
      user.email,
      user.confirmationCode
    );
    return res.send({ message: "Un email a été envoyé à l'adresse indiquée" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

/**
 * Resets the user's password.
 * @description This function is called when the user clicks on the link in the email.
 * @async
 * @function
 * @param {Object} req - Express request object containing the confirmation code and new password.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with a message indicating the password reset status.
 * @throws {Object} JSON response with a 401 status if the user is not found.
 * @throws {Object} JSON response with a 500 status if an error occurs.
 */
exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      confirmationCode: req.params.confirmationCode,
    });

    if (!user) {
      return res.status(401).send({ message: "Utilisateur non trouvé." });
    }
    user.password = bcrypt.hashSync(req.body.password, 8);

    await user.save();

    return res.json({ message: "Votre demande a bien été prise en compte" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
