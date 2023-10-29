/**
 * @fileoverview Defines the controller for user account verification.
 * @module UserVerificationController
 * @namespace UserVerificationController
 * @description This module provides a function for verifying user accounts.
 * @requires dotenv
 * @requires ../models
 * @exports verifyUserStatus
 * @see {@link https://www.npmjs.com/package/dotenv|dotenv}
 */

// import dependencies
const dotenv = require("dotenv");

/**
 * @typedef {import('../models').User} User
 */
const db = require("../models");

/**
 * User model from the database.
 * @type {User}
 */
const User = db.user;

/**
 * @description Loads environment variables from a .env file into process.env
 */
dotenv.config();

/**
 * @function verifyUserStatus
 * @async
 * @description Verifies the user's account status. - This function is called when the user clicks on the link in the email.
 * @see {@link module:UserVerificationRoutes} - This function is used in the GET /api/verify/:confirmationCode route.
 * @param {Object} req - Express request object containing the confirmation code as a parameter.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response with a message indicating the account activation status.
 * @throws {Unauthorized} JSON response with a 401 status if the user is not found.
 * @throws {Forbidden} JSON response with a 403 status if the email has already been verified.
 * @throws {InternalServerError} JSON response with a 500 status if an internal server error occurs.
 * @example
 * // Route definition in another file
 * app.post(
    "/api/auth/verify/:confirmationCode",
    verifyUserStatus.verifyUserStatus
  );
 */
exports.verifyUserStatus = async (req, res) => {
  try {
    // Find the user with the confirmation code
    const user = await User.findOne({
      confirmationCode: req.params.confirmationCode,
    });

    // Incorrect confirmation code
    if (!user) {
      return res.status(401).send({ message: "Utilisateur non trouvé." });
    }

    // If the profile has already been activated
    if (user.status === "Active") {
      return res.status(403).send({
        message: "Cet email a déjà été vérifié",
      });
    }

    // Updating the user status
    user.status = "Active";

    // Saving the new user state
    await user.save();

    // Sending the response
    res.json({ message: "Le compte a bien été activé!" });
  } catch (err) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).send({ message: err });
  }
};
