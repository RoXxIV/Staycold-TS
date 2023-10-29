/**
 * @fileoverview Defines and configures the routes for user-related operations.
 * @module UserRoutes
 * @namespace UserRoutes
 * @description Defines the routes for user-related operations.
 * @requires ../controllers/user.controller - UserController
 * @requires ../middlewares - authJwt
 */
const controller = require("../controllers/user.controller");
const { authJwt } = require("../middlewares");

/**
 * @function
 * @description Configures user-related routes.
 * @see {@link module:UserController} - This function uses the UserController for handling routes.
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
   * @name findAllUsers
   * @function
   * @group User - Operations related to users.
   * @description Route to get all users.
   * @path {GET} /api/users/all
   * @see {@link module:UserController.findAllUsers} - This function uses the UserController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @middleware authJwt.verifyToken, authJwt.isModerator
   * @returns {Object} 200 - JSON response containing all users.
   * @returns {Object} 400 - JSON response with an error message.
   * @security JWT
   */
  app.get(
    "/api/users/all",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.findAllUsers
  );

  /**
   * @name getOneUser
   * @function
   * @group User - Operations related to users.
   * @description Route to get a single user.
   * @path {GET} /api/users/:id
   * @see {@link module:UserController.getOneUser} - This function uses the UserController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @middleware authJwt.verifyToken, authJwt.isModerator
   * @param {string} id.path.required - User ID
   * @returns {Object} 200 - JSON response containing the user information.
   * @returns {Object} 404 - JSON response if the user is not found.
   * @security JWT
   */
  app.get(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.getOneUser
  );

  /**
   * @name deleteOneUser
   * @function
   * @group User - Operations related to users.
   * @description Route to delete a single user.
   * @path {DELETE} /api/users/:id
   * @see {@link module:UserController.deleteOneUser} - This function uses the UserController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @middleware authJwt.verifyToken, authJwt.isAdmin
   * @param {string} id.path.required - User ID
   * @returns {Object} 200 - JSON response confirming the deletion.
   * @returns {Object} 400 - JSON response with an error message.
   * @security JWT
   */
  app.delete(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOneUser
  );

  /**
   * @name updateUserRole
   * @function
   * @group User - Operations related to users.
   * @description Route to update a user's role.
   * @path {POST} /api/users/update-role/:id
   * @see {@link module:UserController.updateUserRole} - This function uses the UserController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @middleware authJwt.verifyToken, authJwt.isAdmin
   * @param {string} id.path.required - User ID
   * @returns {Object} 200 - JSON response confirming the role update.
   * @returns {Object} 400 - JSON response with an error message.
   * @security JWT
   */
  app.post(
    "/api/users/update-role/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUserRole
  );
};
