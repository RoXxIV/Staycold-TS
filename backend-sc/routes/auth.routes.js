/**
 * @module AuthRoutes
 * @requires ../middlewares
 * @requires ../controllers/user-signup.controller
 */
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/user-signup.controller");

/**
 * Configure routes for user signup.
 *
 * @function
 * @param {Object} app - Express app.
 */
module.exports = function (app) {
  /**
   * Middleware to set headers for CORS and tokens.
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
   * POST route for user signup.
   * Middleware functions check for duplicate username or email and validate roles.
   *
   * @name signup
   * @path {POST} /api/auth/signup
   * @middleware checkDuplicateUsernameOrEmail - Checks for duplicate username or email.
   * @middleware checkRolesExisted - Validates roles.
   */
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
};
