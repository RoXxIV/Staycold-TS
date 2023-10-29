/**
 * @fileoverview Defines the controller for user signup functionality.
 * @module UserSignup
 * @namespace UserSignup
 * @description This module provides a function for user signup.
 * @requires dotenv - Module for loading environment variables from a .env file.
 * @requires jsonwebtoken - Module for generating JWT tokens.
 * @requires bcryptjs - Module for hashing passwords.
 * @requires ../plugins/nodemailer.config - Module for sending emails.
 * @requires ../models - User and Role models from the database.
 * @exports signup
 * @see {@link https://www.npmjs.com/package/dotenv|dotenv}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken|jsonwebtoken}
 * @see {@link https://www.npmjs.com/package/bcryptjs|bcryptjs}
 */

// import dependencies
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("../plugins/nodemailer.config");

/**
 * @typedef {import('../models').User} User
 * @typedef {import('../models').Role} Role
 */
const db = require("../models");

/**
 * User model from the database.
 * @type {User}
 */
const User = db.user;
/**
 * Role models from the database.
 * @type {Role}
 */
const Role = db.role;

/**
 * @description Loads environment variables from a .env file into process.env
 */
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
 * @example
 * // Route definition in another file
 * app.post(
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

    // Create a new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      confirmationCode: token,
    });

    // Save the user to the database
    await user.save();

    // Role management
    if (req.body.roles) {
      const roles = await Role.find({
        name: { $in: req.body.roles },
      });

      // Add roles to the user
      user.roles = roles.map((role) => role._id);
      await user.save();

      // Send confirmation email
      nodemailer.sendActivationMail(
        user.username,
        user.email,
        user.confirmationCode
      );
      res.send({
        message:
          "L'utilisateur a été enregistré avec succès! merci de vérifier votre email",
      });
    } else {
      const role = await Role.findOne({ name: "user" });

      // Add 'user' role to the user
      user.roles = [role._id];
      await user.save();

      // Send confirmation email
      nodemailer.sendActivationMail(
        user.username,
        user.email,
        user.confirmationCode
      );
      // Send response
      res.send({
        message:
          "L'utilisateur a été enregistré avec succès! merci de vérifier votre email",
      });
    }
  } catch (err) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).send({ message: err });
  }
};
