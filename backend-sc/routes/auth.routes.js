/**
 * @module AuthRoutes
 * @requires ../middlewares
 * @requires ../controllers/user-signup.controller
 * @requires ../controllers/user-verify-status
 */
const { verifySignUp } = require("../middlewares");
const signupController = require("../controllers/user-signup.controller");
const verifyUserStatus = require("../controllers/user-verify-status");
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
   * @name signupController
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
    signupController.signup
  );

  /**
   * POST route for user email verification.
   *
   * @name verifyUserStatus
   * @path {POST} /api/auth/verify/:confirmationCode
   */
  app.post(
    "/api/auth/verify/:confirmationCode",
    verifyUserStatus.verifyUserStatus
  );
};
