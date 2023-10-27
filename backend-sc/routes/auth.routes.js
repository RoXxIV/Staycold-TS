/**
 * @fileoverview Defines routes for authentication-related operations.
 */
/**
 * @module AuthRoutes
 * @description Aggregates routes for user signup.
 * @requires ../middlewares
 * @requires ../controllers/user-signup.controller
 * @requires ../controllers/user-verify-status
 * @requires ../controllers/user-signin.controller
 */
const { verifySignUp } = require("../middlewares");
const signupController = require("../controllers/user-signup.controller");
const verifyUserStatus = require("../controllers/user-verify-status.controller");
const signinController = require("../controllers/user-signin.controller");
const resetPasswordController = require("../controllers/user-reset-password.controller");
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

  /**
   * POST route for user signin.
   *
   * @name signin
   * @path {POST} /api/auth/signin
   */
  app.post("/api/auth/signin", signinController.signin);

  /**
   * @description Envoie du mail permettant de générer un nouveau mot de passe.
   * @name resetPasswordEmail
   * @path {POST} /api/auth/email-reset-password/:email
   */
  app.post(
    "/api/auth/email-reset-password/:email",
    resetPasswordController.sendEmailResetPassword
  );
  /**
   * @description envoie du nouveau mot de passe.
   * @name resetPassword
   * @path {POST} /api/auth/reset-password/:confirmationCode
   */
  app.post(
    "/api/auth/reset-password/:confirmationCode",
    resetPasswordController.resetPassword
  );
};
