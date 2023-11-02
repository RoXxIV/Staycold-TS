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
// import database models
const db = require("../../models");
const User = db.user;

/**
 * @function sendEmailResetPassword
 * @async
 * @description Sends a password reset email to the user. - This function is called when the user clicks on the "Forgot password" button.
 * @see {@link module:AuthRoutes} - This function is used in the POST /api/auth/email-reset-password/:email route.
 * @see {@link module:Nodemailer.sendResetPasswordMail} - This function uses the sendResetPasswordMail function from the Nodemailer module.
 * @param {Object} req - Express request object containing the user's email.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response with a message indicating the email sending status.
 * @throws {BadRequest} JSON response with a 401 status if the user is not found or the confirmation code is invalid.
 * @throws {InternalServerError} JSON response with a 500 status if an internal server error occurs, such as failure in updating the password.
 * @example 
 * // Route definition in another file
 * app.post(
    "/api/auth/email-reset-password/:email",
    resetPasswordController.sendEmailResetPassword
  );
 */
exports.sendEmailResetPassword = async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Utilisateur non trouvé" });
    }
    // Send email
    await nodemailer.sendResetPasswordMail(
      user.username,
      user.email,
      user.confirmationCode
    );

    // Send response
    return res.send({ message: "Un email a été envoyé à l'adresse indiquée" });
  } catch (err) {
    // console.log("Caught an error:", error); // Debug log
    return res.status(500).send({ message: err });
  }
};

/**
 * @function resetPassword
 * @async
 * @description Resets the user's password.
 * @see {@link module:AuthRoutes} - This function is used in the POST /api/auth/reset-password/:confirmationCode route.
 * @param {Object} req - Express request object containing the confirmation code and new password.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response with a message indicating the password reset status.
 * @throws {Object} JSON response with a 401 status if the user is not found.
 * @throws {Object} JSON response with a 500 status if an error occurs.
 * @example 
 * // Route definition in another file
 * app.post(
    "/api/auth/reset-password/:confirmationCode",
    resetPasswordController.resetPassword
  );
 */
exports.resetPassword = async (req, res) => {
  try {
    // Find user by confirmation code
    const user = await User.findOne({
      confirmationCode: req.params.confirmationCode,
    });

    // Check if user exists
    if (!user) {
      return res.status(401).send({ message: "Utilisateur non trouvé." });
    }
    // Update password
    user.password = bcrypt.hashSync(req.body.password, 8);

    // Save user
    await user.save();

    // Send response
    return res.json({ message: "Votre demande a bien été prise en compte" });
  } catch (err) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).send({ message: err });
  }
};
