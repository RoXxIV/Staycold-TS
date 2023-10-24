/**
 * @module VerifySignUp
 * @description Middleware for user signup verification.
 * @requires ../models
 */
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 * Middleware to check if the username or email is already in use.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws Will send a 500 status if an error occurs.
 * @throws Will send a 400 status if the username or email is already in use.
 */
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for duplicate username
    const userByUsername = await User.findOne({
      username: req.body.username,
    }).exec();
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
 * Middleware to check if the roles in the request exist.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws Will send a 400 status if any of the roles do not exist.
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

/**
 * Object containing verification middlewares.
 * @type {Object}
 */
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
