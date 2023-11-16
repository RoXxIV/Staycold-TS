/**
 * @fileoverview Aggregates various middlewares.
 * @module Middlewares
 * @description This module aggregates various middlewares for user authentication and verification.
 * @requires ./verify-signup - Middlewares for user signup verification.
 * @requires ./auth-jwt - Middlewares for JWT authentication.
 * @requires ./signup-validator - Middlewares for validating user signup request body.
 * @exports authJwt - Middlewares for JWT authentication.
 * @exports verifySignUp - Middlewares for user signup verification.
 * @exports signupValidatorRules - Middlewares for validating user signup request body.
 */

/**
 * @typedef {Object} Middlewares
 * @property {Object} verifySignUp - Middlewares for user signup verification.
 * @property {Object} authJwt - Middlewares for JWT authentication.
 * @property {Object} signupValidatorRules - Middlewares for validating user signup request body.
 */

// import dependencies
const verifySignUp = require("./verify-signup");
const authJwt = require("./auth-jwt");
const signupValidatorRules = require("./signup-validator");

// export middlewares
module.exports = {
  authJwt,
  verifySignUp,
  signupValidatorRules,
};
