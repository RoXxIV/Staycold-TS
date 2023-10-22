/** @requires module:mongoose */
const mongoose = require("mongoose");

/** use mongoose in different position inside the codes */
mongoose.Promise = global.Promise;

/**
 * @module db
 * @type {object}
 */
const db = {};

db.mongoose = mongoose;

module.exports = db;
