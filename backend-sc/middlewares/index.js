/**
 * @module Middlewares
 * @description Aggregates various middlewares.
 * @requires ./verify-signup
 * @requires ./auth-jwt
 */

/**
 * Aggregates various verification middlewares.
 *
 * @type {Object}
 * @property {Object} verifySignUp - Middlewares for user signup verification.
 * @property {Object} authJwt - Middlewares for JWT authentication.
 */
const verifySignUp = require("./verify-signup");
const authJwt = require("./auth-jwt");

module.exports = {
  authJwt,
  verifySignUp,
};
