/**
 * @fileoverview Defines the controller for user signup functionality.
 * @module UserSignupController
 * @description This module provides a function for user signup.
 * @requires dotenv - Module for loading environment variables from a .env file.
 * @requires jsonwebtoken - Module for generating JWT tokens.
 * @requires bcryptjs - Module for hashing passwords.
 * @requires ../../plugins/nodemailer.config - Module for sending emails.
 * @requires ../../models - User and Role models from the database.
 * @see {@link https://www.npmjs.com/package/dotenv|dotenv}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken|jsonwebtoken}
 * @see {@link https://www.npmjs.com/package/bcryptjs|bcryptjs}
 * @see {@link module:NodemailerConfig} - Nodemailer configuration for sending emails.
 * @see {@link module:User} - User model from the database.
 * @see {@link module:Role} - Role model from the database.
 * @exports module:UserSignupController
 */

// import dependencies
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("../../plugins/nodemailer.config");

// import database models
const db = require("../../models");
const errorMessages = require("../../utils/errorMessages");

const User = db.user;
const Role = db.role;

// Load environment variables
dotenv.config();

/**
 * @function signup
 * @async
 * @description Handles user signup - This function is called when the user clicks on the "Sign up" button.
 * @see {@link module:AuthRoutes} - This function is used in the POST /api/auth/signup route.
 * @param {Object} req - Express request object containing user details.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} No return value but sends a response to the client.
 * @throws {InternalServerError} JSON response with a 500 status if an internal server error occurs.
 * @example app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    signupController.signup
  );
 */
exports.signup = async (req, res) => {
  try {
    // Generate unique confirmationCode for email verification
    const token = jwt
      .sign({ email: req.body.email }, process.env.JWT_KEY, {
        expiresIn: "24h",
      })
      .replace(/\./g, "0");

    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      confirmationCode: token,
    };

    // Create a new user
    const user = new User(newUser);

    // Assign roles to the user
    await assignRolesToUser(req, user);

    // Save the user to the database
    await user.save();

    nodemailer.sendActivationMail(
      user.username,
      user.email,
      user.confirmationCode
    );

    // Send response
    res.send({
      id: user._id,
      message:
        "L'utilisateur a été enregistré avec succès! merci de vérifier votre email",
    });
  } catch (err) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).send({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

/**
 * @function assignRolesToUser
 * @description Assigns roles to the user.
 * @param {*} req
 * @param {*} user
 * @returns {Promise<void>} No return value but assigns roles to the user.
 */
async function assignRolesToUser(req, user) {
  if (req.body.roles) {
    const roles = await Role.find({ name: { $in: req.body.roles } });
    user.roles = roles.map((role) => role._id);
  } else {
    const defaultRole = await Role.findOne({ name: "user" });
    user.roles = [defaultRole._id];
  }
}
