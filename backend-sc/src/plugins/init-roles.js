/**
 * @module RoleInitialization
 * @description This module provides a function to initialize roles in the database.
 * It is intended to run once when the application starts.
 * @requires ModelsIndex - Mongoose database models.
 */

// import database models
const db = require("../models");
const Role = db.role;

/**
 * @description The names of the available roles.
 * @typedef {Object} RoleNames
 * @property {string} USER - The name of the user role.
 * @property {string} MODERATOR - The name of the moderator role.
 * @property {string} ADMIN - The name of the admin role.
 */
const ROLE_NAMES = {
  USER: "user",
  MODERATOR: "moderator",
  ADMIN: "admin",
};

/**
 * @function initRoles
 * @async
 * @description Initializes roles in the database if they do not exist - This function is intended to run once when the application starts.
 * @throws {Error} Will throw an error if the operation fails.
 * @returns {Promise<void>} Promise object representing the completion of the operation.
 * @example <caption>Example usage of initRoles.</caption>
 * const initRoles = require("./plugins/init-roles");
 * // Call the function
 * initRoles();
 */
const initRoles = async () => {
  try {
    // Check if the roles collection is empty - If it is empty, add the roles
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await new Role({ name: ROLE_NAMES.USER }).save();
      console.log(`Added ${ROLE_NAMES.USER} to roles collection`);
      await new Role({ name: ROLE_NAMES.MODERATOR }).save();
      console.log(`Added ${ROLE_NAMES.MODERATOR} to roles collection`);
      await new Role({ name: ROLE_NAMES.ADMIN }).save();
      console.log(`Added ${ROLE_NAMES.ADMIN} to roles collection`);
    }
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = initRoles;
