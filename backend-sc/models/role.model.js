/**
 * @module RoleModel
 * @description Defines the structure of the Role document in MongoDB.
 * @requires mongoose
 * @exports module:RoleModel.Role
 */
const mongoose = require("mongoose");
/**
 * @typedef {Object} RoleSchema
 * @property {string} name - The title of the role.
 * @property {string} _id - The unique identifier of the role.
 */

/**
 * @constructor
 * @param {RoleSchema} roleSchema - Defines the structure of the Role document in MongoDB.
 */
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    /**
     * @type {string}
     * @description The title of the role.
     */
    name: {
      type: String,
      required: true,
    },
  })
);

module.exports = Role;
