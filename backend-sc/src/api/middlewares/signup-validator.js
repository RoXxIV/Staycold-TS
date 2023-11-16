/**
 * @fileoverview Validates the user signup request body.
 * @module signupValidatorRules
 * @requires express-validator/check
 * @see {@link https://express-validator.github.io/docs/|express-validator}
 * @exports module:signupValidatorRules
 */
// import dependencies
const { body } = require("express-validator");

/**
 * @function signupValidatorRules
 * @description Validates the user signup request body.
 * @returns {Array} An array of express-validator middleware functions.
 */
const signupValidatorRules = () => {
  return [
    // Validate username
    body("username")
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage("Username must be between 3 and 50 characters long."),
    // Validate email
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email address."),
    // Validate password
    body("password")
      .isLength({ min: 8, max: 128 })
      .withMessage("Password must be between 8 and 128 characters long."),
  ];
};

module.exports = signupValidatorRules;
