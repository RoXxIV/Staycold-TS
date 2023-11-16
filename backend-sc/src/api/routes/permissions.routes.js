/**
 * @fileoverview Defines routes for permission-related operations.
 * @module UserPermissionsRoutes
 * @description This module handles all routes related to user permissions.
 * @requires ../controllers/user-permissions.controller - UserPermissionsController
 * @requires ../middlewares - authJwt
 */

// Import dependencies
const controller = require("../controllers/user-permissions.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  /**
   * @description This middleware is used to set headers for CORS and tokens.
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
   * @name GET /api/permissions/all
   * @description Route for public access.
   * @see {@link module:UserPermissionsController.allAccess} - This function uses the UserPermissionsController for handling routes.
   * @returns {Object} 200 - JSON response with public content
   * @example <caption>Example</caption>
   * app.get("/api/permissions/all", controller.allAccess);
   * @example <caption>Example response</caption>
   * {
   * "message": "Public Content."
   * }
   */
  app.get("/api/permissions/all", controller.allAccess);

  /**
   * @name GET /api/permissions/user
   * @description Route for user access, requires token verification.
   * @see {@link module:UserPermissionsController.userBoard} - This function uses the UserPermissionsController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @returns {Object} 200 - JSON response with user content
   * @security JWT
   * @example <caption>Example</caption>
   * app.get("/api/permissions/user", [authJwt.verifyToken], controller.userBoard);
   * @example <caption>Example response</caption>
   * {
   * "message": "User Content."
   * }
   */
  app.get("/api/permissions/user", [authJwt.verifyToken], controller.userBoard);

  /**
   * @name GET /api/permissions/mod
   * @description Route for moderator access, requires token and moderator role verification.
   * @see {@link module:UserPermissionsController.moderatorBoard} - This function uses the UserPermissionsController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @see {@link module:AuthJwt.isModerator} - This function uses the isModerator middleware.
   * @returns {Object} 200 - JSON response with moderator content
   * @security JWT
   * @example <caption>Example</caption>
   * app.get(
    "/api/permissions/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
    * @example <caption>Example response</caption>
    * {
    * "message": "Moderator Content."
    * }
   */
  app.get(
    "/api/permissions/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  /**
   * @name GET /api/permissions/admin
   * @description Route for admin access, requires token and admin role verification.
   * @see {@link module:UserPermissionsController.moderatorBoard} - This function uses the UserPermissionsController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @see {@link module:AuthJwt.isAdmin} - This function uses the isAdmin middleware.
   * @returns {Object} 200 - JSON response with admin content
   * @security JWT
   * @example <caption>Example</caption>
   * app.get(
   * "/api/permissions/admin",
   * [authJwt.verifyToken, authJwt.isAdmin],
   * controller.adminBoard
   * );
   * @example <caption>Example response</caption>
   * {
   * "message": "Admin Content."
   * }
   */
  app.get(
    "/api/permissions/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
