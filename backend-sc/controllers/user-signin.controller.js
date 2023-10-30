/**
 * @fileoverview Defines the controller for user signin functionality.
 * @module UserSigninController
 * @description This module provides a function for user signin.
 * @requires dotenv - Module for loading environment variables from a .env file.
 * @requires ../models - User model from the database.
 * @requires jsonwebtoken - Module for generating JWT tokens.
 * @requires bcryptjs - Module for hashing passwords.
 * @see {@link https://www.npmjs.com/package/dotenv|dotenv}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken|jsonwebtoken}
 * @see {@link https://www.npmjs.com/package/bcryptjs|bcryptjs}
 * @see {@link module:User} - User model from the database.
 * @exports module:UserSigninController
 */

// import dependencies
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// import database models
const db = require("../models");

const User = db.user;

// Load environment variables
dotenv.config();

/**
 * @function signin
 * @async
 * @description Handles user signin - This function is called when the user clicks on the "Sign in" button.
 * @see {@link module:AuthRoutes} - This function is used in the POST /api/auth/signin route.
 * @param {Object} req - Express request object containing the username and password.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response containing user details and access token.
 * @throws {UserNotFound} JSON response with a 404 status if the user is not found.
 * @throws {Unauthorized} JSON response with a 401 status if the password is incorrect.
 * @throws {Forbidden} JSON response with a 403 status if the account is not active.
 * @throws {InternalServerError} JSON response with a 500 status if an internal server error occurs.
 * @example
 * // Route definition in another file
 * app.post("/api/auth/signin", signinController.signin);
 */
exports.signin = async (req, res) => {
  try {
    // Find the user by username and populate roles
    const user = await User.findOne({ username: req.body.username })
      .populate("roles", "-__v")
      .exec();

    // Check if user exists
    if (!user) {
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }

    // Validate password
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    // Check if password is valid
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Mot de passe incorrect!",
      });
    }

    // Check if account is active
    if (user.status !== "Active") {
      return res.status(403).send({
        message: "Veuillez vérifier votre email pour activer votre compte!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: 86400, // 24 hours
    });

    // Map roles to authorities
    const authorities = user.roles.map(
      (role) => `ROLE_${role.name.toUpperCase()}`
    );

    // Send response
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
      createdAt: user.createdAt,
    });
  } catch (err) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).send({ message: err });
  }
};
