/**
 * @fileoverview Aggregates various middlewares.
 * @module Middlewares
 * @description This module aggregates various middlewares for user authentication and verification.
 * @requires ./verify-signup - Middlewares for user signup verification.
 * @requires ./auth-jwt - Middlewares for JWT authentication.
 * @exports authJwt - Middlewares for JWT authentication.
 * @exports verifySignUp - Middlewares for user signup verification.
 */

/**
 * @typedef {Object} Middlewares
 * @property {Object} verifySignUp - Middlewares for user signup verification.
 * @property {Object} authJwt - Middlewares for JWT authentication.
 */

// import dependencies
const verifySignUp = require("./verify-signup");
const authJwt = require("./auth-jwt");

// export middlewares
module.exports = {
  authJwt,
  verifySignUp,
};
