/**
 * @module DatabaseConfiguration
 * @requires mongoose
 * @requires ./user.model
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

module.exports = db;
