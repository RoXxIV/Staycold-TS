/**
 * @module ModelsIndex
 * @description Aggregates all models and provides a unified interface for database operations.
 * @requires mongoose - MongoDB object modeling tool.
 * @see {@link https://mongoosejs.com/docs/models.html|mongoose}
 * @requires UserModel - User model for user-related operations.
 * @requires RoleModel - Role model for role-related operations.
 * @requires BathModel - Bath model for bath-related operations.
 */

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @typedef {Object} Models
 * @property {mongoose} mongoose - The mongoose instance.
 * @property {mongoose.Model} user - The User model.
 * @property {mongoose.Model} role - The Role model.
 * @property {mongoose.Model} bath - The Bath model.
 * @property {Array.<string>} ROLES - The available roles.
 */

// Create the database object and add the mongoose instance to the database object
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "moderator", "admin"];
db.bath = require("./bath.model");

module.exports = db;
