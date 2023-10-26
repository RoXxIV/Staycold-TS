/**
 * @module UserPermissionsController
 * @description Defines the controller for user permissions.
 */

/**
 * Sends a response for public access.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with public content.
 */
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

/**
 * Sends a response for user access.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with user content.
 */
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

/**
 * Sends a response for moderator access.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with moderator content.
 */
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

/**
 * Sends a response for admin access.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with admin content.
 */
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
