/**
 * @fileoverview Aggregates and exports all models for MongoDB.
 * @module ModelsIndex
 * @namespace ModelsIndex
 * @description Aggregates all models and provides a unified interface for database operations.
 * @requires mongoose - MongoDB object modeling tool.
 * @see {@link https://mongoosejs.com/docs/models.html|mongoose}
 * @requires ./user.model - User model for user-related operations.
 * @requires ./role.model - Role model for role-related operations.
 * @requires ./bath.model - Bath model for bath-related operations.
 */

// Import dependencies
const mongoose = require("mongoose");

/**
 * @description Use native ES6 promises for mongoose.
 */
mongoose.Promise = global.Promise;

/**
 * @typedef {Object} Database
 * @description Database object to hold mongoose and models.
 * @property {mongoose} mongoose - The mongoose instance.
 * @property {mongoose.Model} user - The User model.
 * @property {mongoose.Model} role - The Role model.
 * @property {mongoose.Model} bath - The Bath model.
 * @property {Array.<string>} ROLES - The available roles.
 */

/**
 * @type {Database}
 * @description Aggregated database object containing mongoose and models.
 */
const db = {};

/**
 * @type {mongoose}
 * @description Mongoose instance for MongoDB operations.
 */
db.mongoose = mongoose;

/**
 * @type {mongoose.Model}
 * @description User model for user-related operations.
 */
db.user = require("./user.model");
/**
 * @type {mongoose.Model}
 * @description Role model for role-related operations.
 */
db.role = require("./role.model");
/**
 * @type {Array.<string>}
 * @description Array of available roles.
 */
db.ROLES = ["user", "moderator", "admin"];
/**
 * @type {mongoose.Model}
 * @description Bath model for bath-related operations.
 */
db.bath = require("./bath.model");

// Export the aggregated database object
module.exports = db;
