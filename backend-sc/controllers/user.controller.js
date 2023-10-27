/**
 * @module UserController
 * @description Defines the controller for user-related operations.
 * @requires ../models
 */
const db = require("../models");

const User = db.user;
const Role = db.role;
const Bath = db.bath;
const sortOptions = { roles: -1 };
/**
 * Fetches all users from the database.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response containing all users.
 * @throws {Object} JSON response with a 400 status if an error occurs.
 */
exports.findAllUsers = async (req, res) => {
  try {
    // Fetch all users while excluding password and confirmationCode fields
    // Also populate the 'roles' field with the role name
    const users = await User.find()
      .select({ password: 0, confirmationCode: 0 })
      .populate("roles", "name")
      .sort(sortOptions);

    // Send the fetched users as a JSON response
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Fetches a single user from the database by ID.
 *
 * @async
 * @function
 * @param {Object} req - Express request object containing the user ID in params.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response containing the user information.
 * @throws {Object} JSON response with a 404 status if the user is not found or an error occurs.
 */
exports.getOneUser = async (req, res, next) => {
  try {
    // Fetch the user by ID while excluding password and confirmationCode fields
    // Also populate the 'roles' field with the role name
    const user = await User.findOne({ _id: req.params.id })
      .select({ password: 0, confirmationCode: 0 })
      .populate("roles", "name");

    // If the user is not found, return a 404 status
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Send the fetched user as a JSON response
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Deletes a user and associated baths from the database by ID.
 *
 * @async
 * @function
 * @param {Object} req - Express request object containing the user ID in params.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response confirming the deletion.
 * @throws {Object} JSON response with a 400 status if an error occurs.
 * @throws {Object} JSON response with a 404 status if the user is not found.
 */
exports.deleteOneUser = async (req, res, next) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Delete the user by ID
    await User.deleteOne({ _id: req.params.id });

    // Delete all baths associated with the user
    await Bath.deleteMany({ author: req.params.id });

    // Send a success message as a JSON response
    res.status(200).json({
      message:
        "L'utilisateur et les baignades associés ont bien été supprimé !",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Updates the role of a user by ID.
 *
 * @async
 * @function
 * @param {Object} req - Express request object containing the user ID in params and new roles in body.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response confirming the role update.
 * @throws {Object} JSON response with a 401 status if the user is not found.
 * @throws {Object} JSON response with a 500 status if an error occurs.
 * @throws {Object} JSON response with a 400 status for other errors.
 */
exports.updateUserRole = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findOne({ _id: req.params.id });

    // Check if the user exists
    if (!user) {
      return res.status(401).send({ message: "Utilisateur non trouvé." });
    }

    // Handle role updates
    if (req.body.roles) {
      const roles = await Role.find({
        name: { $in: req.body.roles },
      });

      // Update the user's roles
      user.roles = roles.map((role) => role._id);

      // Save the updated user
      await user.save();
    }

    // Send a success message as a JSON response
    res.status(200).send("Le Role a été mis à jour.");
  } catch (error) {
    res.status(400).json({ error });
  }
};
