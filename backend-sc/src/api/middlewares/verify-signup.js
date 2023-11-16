/**
 * @fileoverview Middleware for user signup verification.
 * @module VerifySignUp
 * @description This module contains middlewares for verifying user signup.
 * @requires ../../models - Sequelize database models.
 * @exports module:VerifySignUp
 * @see {@link module:AuthRoutes} - Routes for user signup and account verification.
 * @see {@link module:UserSignupController} - Controller for user signup.
 */

// import database models
const db = require("../../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 * @function checkDuplicateUsernameOrEmail
 * @async
 * @description Middleware to check if the username or email is already in use.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {Object} Will send a 500 status if an error occurs.
 * @throws {Object} Will send a 400 status if the username or email is already in use.
 * @example <caption>Example usage of checkDuplicateUsernameOrEmail middleware.</caption>
 * app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    signupController.signup
  );
 */
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for duplicate username
    const userByUsername = await User.findOne({
      username: req.body.username,
    }).exec();

    // If username is already taken
    if (userByUsername) {
      return res.status(400).send({
        message: "Ce Nom d'utilisateur est déjà utilisé!",
      });
    }

    // Check for duplicate email
    const userByEmail = await User.findOne({ email: req.body.email }).exec();
    if (userByEmail) {
      return res.status(400).send({
        message: "Cet email est déjà utilisé!",
      });
    }

    // If username and email are available
    next();
  } catch (err) {
    return res.status(500).send({
      message: err,
    });
  }
};

/**
 * @function checkRolesExisted
 * @async
 * @description Middleware to check if the roles in the request exist.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {Object} Will send a 400 status if any of the roles do not exist.
 * @example <caption>Example usage of checkRolesExisted middleware.</caption>
 * app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    signupController.signup
  );
 */
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: `Le rôle ${req.body.roles[i]} n'existe pas`,
        });
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
