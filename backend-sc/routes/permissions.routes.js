/**
 * @module UserPermissionsRoutes
 * @description Defines the routes for user permissions.
 * @requires ../controllers/user-permissions.controller
 * @requires ../middlewares
 */
const controller = require("../controllers/user-permissions.controller");
const { authJwt } = require("../middlewares");

/**
 * Configures the routes for user permissions.
 *
 * @function
 * @param {Object} app - The Express application object.
 */
module.exports = function (app) {
  /**
   * Middleware to set allowed headers.
   *
   * @function
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
   * Route for public access.
   */
  app.get("/api/permissions/all", controller.allAccess);

  /**
   * Route for user access, requires token verification.
   */
  app.get("/api/permissions/user", [authJwt.verifyToken], controller.userBoard);

  /**
   * Route for moderator access, requires token and moderator role verification.
   */
  app.get(
    "/api/permissions/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  /**
   * Route for admin access, requires token and admin role verification.
   */
  app.get(
    "/api/permissions/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
