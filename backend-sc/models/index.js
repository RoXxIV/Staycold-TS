/**
 * @module ModelsIndex
 * @description Aggregates all models.
 * @requires mongoose
 * @requires ./user.model
 * @requires ./role.model
 * @requires ./bath.model
 */

const mongoose = require("mongoose");

/**
 * Use native ES6 promises
 */
mongoose.Promise = global.Promise;

/**
 * Database object to hold mongoose and models
 * @typedef {Object} Database
 * @property {mongoose} mongoose - The mongoose instance.
 * @property {mongoose.Model} user - The User model.
 * @property {mongoose.Model} role - The Role model.
 * @property {mongoose.Model} bath - The Bath model.
 * @property {Array.<string>} ROLES - The available roles.
 */
/**
 * @type {Database}
 */
const db = {};

/**
 * Mongoose instance
 * @type {mongoose}
 */
db.mongoose = mongoose;

/**
 * User model
 * @type {mongoose.Model}
 */
db.user = require("./user.model");
/**
 * Role model
 * @type {mongoose.Model}
 */
db.role = require("./role.model");
/**
 * Available roles
 * @type {Array.<string>}
 */
db.ROLES = ["user", "moderator", "admin"];
/**
 * Bath model
 * @type {mongoose.Model}
 */
db.bath = require("./bath.model");

module.exports = db;
