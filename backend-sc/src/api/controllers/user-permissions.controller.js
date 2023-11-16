/**
 * @fileoverview Defines the controller for user permissions.
 * @module UserPermissionsController
 * @description This module handles all operations related to user permissions.
 * @requires ../middlewares/auth-jwt - Middleware for verifying JWT tokens.
 * @exports module:UserPermissionsController
 * @see {@link module:UserPermissionsRoutes} - Router for user permissions routes.
 */

/**
 * @function allAccess
 * @description Sends a response for public access.
 * @see {@link module:UserPermissionsRoutes} - This function is used in the GET /api/permissions/all route.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with public content.
 * @example app.get("/api/permissions/all", controller.allAccess);
 */
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

/**
 * @function userBoard
 * @description Sends a response for user access.
 * @see {@link module:UserPermissionsRoutes} - This function is used in the GET /api/permissions/user route.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with user content.
 * @example app.get("/api/permissions/user", [authJwt.verifyToken], controller.userBoard);
 */
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

/**
 * @function moderatorBoard
 * @description Sends a response for moderator access.
 * @see {@link module:UserPermissionsRoutes} - This function is used in the GET /api/permissions/mod route.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with moderator content.
 * @example app.get(
    "/api/permissions/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
 */
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

/**
 * @function adminBoard
 * @description Sends a response for admin access.
 * @see {@link module:UserPermissionsRoutes} - This function is used in the GET /api/permissions/admin route.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with admin content.
 * @example app.get(
    "/api/permissions/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
 */
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
