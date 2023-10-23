/**
 * @module Middlewares
 * @requires ./verify-signup
 */

/**
 * Aggregates various verification middlewares.
 *
 * @type {Object}
 * @property {Object} verifySignUp - Middlewares for user signup verification.
 */
const verifySignUp = require("./verify-signup");

module.exports = {
  verifySignUp,
};
