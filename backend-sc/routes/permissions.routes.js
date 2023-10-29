/**
 * @fileoverview Defines routes for permission-related operations.
 * @module UserPermissionsRoutes
 * @namespace UserPermissionsRoutes
 * @description This module handles all routes related to user permissions.
 * @requires ../controllers/user-permissions.controller - UserPermissionsController
 * @requires ../middlewares - authJwt
 */
const controller = require("../controllers/user-permissions.controller");
const { authJwt } = require("../middlewares");

/**
 * @function
 * @description Configures the routes for permission-related operations.
 * @see {@link module:UserPermissionsController} - This function uses the UserPermissionsController for handling routes.
 * @see {@link module:AuthJwt} - This function uses the authJwt middleware.
 * @param {import('express').Application} app - The Express application object.
 */
module.exports = function (app) {
  /**
   * @function
   * @description Middleware to set allowed headers.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {function} next - Express next middleware function.
   */
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @name allAccess
   * @function
   * @group Permissions - Operations related to user permissions
   * @path {GET} /api/permissions/all
   * @description Route for public access.
   * @see {@link module:UserPermissionsController.allAccess} - This function uses the UserPermissionsController for handling routes.
   * @returns {Object} 200 - JSON response with public content
   */
  app.get("/api/permissions/all", controller.allAccess);

  /**
   * @name userBoard
   * @function
   * @group Permissions - Operations related to user permissions
   * @path {GET} /api/permissions/user
   * @description Route for user access, requires token verification.
   * @see {@link module:UserPermissionsController.userBoard} - This function uses the UserPermissionsController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @middleware verifyToken - Verifies the JWT token.
   * @security JWT
   * @returns {Object} 200 - JSON response with user content
   */
  app.get("/api/permissions/user", [authJwt.verifyToken], controller.userBoard);

  /**
   * @name moderatorBoard
   * @function
   * @group Permissions - Operations related to user permissions
   * @path {GET} /api/permissions/mod
   * @description Route for moderator access, requires token and moderator role verification.
   * @see {@link module:UserPermissionsController.moderatorBoard} - This function uses the UserPermissionsController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @see {@link module:AuthJwt.isModerator} - This function uses the isModerator middleware.
   * @middleware verifyToken - Verifies the JWT token.
   * @middleware isModerator - Verifies the user has moderator role.
   * @security JWT
   * @returns {Object} 200 - JSON response with moderator content
   */
  app.get(
    "/api/permissions/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  /**
   * @name adminBoard
   * @function
   * @group Permissions - Operations related to user permissions
   * @path {GET} /api/permissions/admin
   * @description Route for admin access, requires token and admin role verification.
   * @see {@link module:UserPermissionsController.moderatorBoard} - This function uses the UserPermissionsController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @see {@link module:AuthJwt.isAdmin} - This function uses the isAdmin middleware.
   * @middleware verifyToken - Verifies the JWT token.
   * @middleware isAdmin - Verifies the user has admin role.
   * @security JWT
   * @returns {Object} 200 - JSON response with admin content
   */
  app.get(
    "/api/permissions/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
