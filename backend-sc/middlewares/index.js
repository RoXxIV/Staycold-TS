/**
 * @fileoverview Aggregates various middlewares.
 * @module Middlewares
 * @namespace Middlewares
 * @description This module aggregates various middlewares for user authentication and verification.
 * @requires ./verify-signup
 * @requires ./auth-jwt
 * @exports authJwt
 * @exports verifySignUp
 */

/**
 * @typedef {Object} Middlewares
 * @property {Object} verifySignUp - Middlewares for user signup verification.
 * @property {Object} authJwt - Middlewares for JWT authentication.
 */

/**
 * Aggregates various verification middlewares.
 * @type {Middlewares}
 */
const verifySignUp = require("./verify-signup");
const authJwt = require("./auth-jwt");

module.exports = {
  authJwt,
  verifySignUp,
};
