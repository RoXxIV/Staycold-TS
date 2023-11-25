/**
 * @fileoverview Defines services for password reset functionality.
 * @module UserPasswordResetController
 * @description This module provides functions for sending password reset emails and resetting the password.
 * @requires nodemailer - Module for sending emails.
 * @requires bcryptjs - Module for hashing passwords.
 * @requires ../../models - User model from the database.
 * @see {@link https://nodemailer.com/about/|Nodemailer}
 * @see {@link https://www.npmjs.com/package/bcryptjs|bcryptjs}
 * @see {@link module:User} - User model from the database.
 * @exports module:UserPasswordResetController
 * @exports module:sendEmailResetPassword
 */

// import dependencies
const nodemailer = require("../../plugins/nodemailer.config");
const bcrypt = require("bcryptjs");
const errorMessages = require("../../utils/errorMessages");

// import database models
const db = require("../../models");
const User = db.user;

/**
 * @function sendEmailResetPassword
 * @async
 * @description Sends a password reset email to the user. This function is called when the user requests a password reset via the "Forgot password" form.
 * @see {@link module:AuthRoutes} - This function is used in the POST /api/auth/email-reset-password route.
 * @see {@link module:Nodemailer.sendResetPasswordMail} - This function uses the sendResetPasswordMail function from the Nodemailer module to send the email.
 * @param {Object} req - Express request object containing the user's email in the request body.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response with a message indicating the status of the email sending process.
 * @throws {BadRequest} JSON response with a 401 status if the user is not found.
 * @throws {InternalServerError} JSON response with a 500 status if an internal server error occurs, such as a failure in sending the email.
 * @example app.post("/api/auth/email-reset-password", resetPasswordController.sendEmailResetPassword);
 */
exports.sendEmailResetPassword = async (req, res) => {
  try {
    // Get email from request body
    const { email } = req.body;

    // Find user by email and check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Utilisateur non trouvé" });
    }

    // Send email
    await nodemailer.sendResetPasswordMail(
      user.username,
      user.email,
      user.confirmationCode
    );

    return res.send({ message: "Un email a été envoyé à l'adresse indiquée" });
  } catch (err) {
    // console.log("Caught an error:", error); // Debug log
    return res
      .status(500)
      .send({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

/**
 * @function resetPassword
 * @async
 * @description Resets the user's password.
 * @see {@link module:AuthRoutes} - This function is used in the POST /api/auth/reset-password.
 * @param {Object} req - Express request object containing the confirmation code and new password.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response with a message indicating the password reset status.
 * @throws {Object} JSON response with a 401 status if the user is not found.
 * @throws {Object} JSON response with a 500 status if an error occurs.
 * @example app.post("/api/auth/reset-password",resetPasswordController.resetPassword);
 */
exports.resetPassword = async (req, res) => {
  try {
    const confirmationCode = req.body.confirmationCode;
    // Find user by confirmation code
    const user = await User.findOne({ confirmationCode });

    // Check if user exists
    if (!user) {
      return res.status(401).send({ message: "Utilisateur non trouvé." });
    }

    // Update password and save user
    user.password = bcrypt.hashSync(req.body.password, 8);
    await user.save();

    return res.json({ message: "Votre demande a bien été prise en compte" });
  } catch (err) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).send({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};
