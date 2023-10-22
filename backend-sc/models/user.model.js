/**
 * @module User
 * @requires mongoose
 */

const mongoose = require("mongoose");

/**
 * @typedef {Object} UserSchema
 * @property {string} username - The unique username of the user. Min length is 3 and max length is 50.
 * @property {string} email - The unique email address of the user. Max length is 320.
 * @property {string} password - The hashed password of the user. Min length is 8 and max length is 128.
 * @property {string} status - The account status of the user. Can be either "Pending" or "Active". Default is "Pending".
 * @property {string} confirmationCode - The unique confirmation code for account activation or password recovery.
 * @property {Array} roles - The roles assigned to the user.
 */

/**
 * @constructor
 * @param {UserSchema} userSchema - Defines the structure of the User document in MongoDB.
 */
const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      /**
       * @type {string}
       * @description The unique username of the user.
       */
      username: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: true,
        required: true,
      },
      /**
       * @type {string}
       * @description The unique email address of the user.
       */
      email: {
        type: String,
        maxlength: 320,
        unique: true,
        required: true,
      },
      /**
       * @type {string}
       * @description The hashed password of the user.
       */
      password: {
        type: String,
        minlength: 8,
        maxlength: 128,
        required: true,
      },
      /**
       * @type {string}
       * @description The account status of the user.
       */
      status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending",
      },
      /**
       * @type {string}
       * @description The unique confirmation code for account activation or password recovery.
       */
      confirmationCode: {
        type: String,
        unique: true,
      },
      /**
       * @type {Array}
       * @description The roles assigned to the user.
       */
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
    },
    {
      /**
       * @type {boolean}
       * @description Enable timestamps for createdAt and updatedAt fields.
       */
      timestamps: true,
    }
  )
);

module.exports = User;
