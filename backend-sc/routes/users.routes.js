/**
 * @module UserRoutes
 * @description Defines the routes for user-related operations.
 * @requires ../controllers/user.controller
 * @requires ../middlewares
 */
const controller = require("../controllers/user.controller");
const { authJwt } = require("../middlewares");

/**
 * Configures user-related routes.
 *
 * @function
 * @param {Object} app - Express application.
 */
module.exports = function (app) {
  /**
   * Middleware to set allowed HTTP headers.
   *
   * @function
   * @inner
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
   * Route to fetch all users.
   * Accessible only to moderators.
   */
  app.get(
    "/api/users/all",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.findAllUsers
  );

  /**
   * Route to fetch a single user by ID.
   * Accessible only to moderators.
   */
  app.get(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.getOneUser
  );

  /**
   * Route to delete a user by ID.
   * Accessible only to admins.
   */
  app.delete(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOneUser
  );

  /**
   * Route to update the role of a user by ID.
   * Accessible only to admins.
   */
  app.post(
    "/api/users/update-role/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUserRole
  );
};
