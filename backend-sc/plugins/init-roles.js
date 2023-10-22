/**
 * @module RoleInitialization
 * @requires ../models
 */
const db = require("../models");

/**
 * Role model
 * @type {mongoose.Model}
 */
const Role = db.role;

/**
 * Asynchronously initialize roles in the database if they do not exist.
 * This function is intended to run once when the application starts.
 *
 * @async
 * @function
 * @throws Will throw an error if the operation fails.
 */
const initRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      // Create 'user' role
      await new Role({ name: "user" }).save();
      console.log("Added 'user' to roles collection");
      // Create 'moderator' role
      await new Role({ name: "moderator" }).save();
      console.log("Added 'moderator' to roles collection");
      // Create 'admin' role
      await new Role({ name: "admin" }).save();
      console.log("Added 'admin' to roles collection");
    }
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = initRoles;
