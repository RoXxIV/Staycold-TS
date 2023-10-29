/**
 * @fileoverview Defines routes for authentication-related operations.
 * @module AuthRoutes
 * @namespace AuthRoutes
 * @description This module aggregates routes for user signup, signin, and account verification.
 * @requires ../middlewares - Middleware for authentication and other functionalities.
 * @requires ../controllers/user-signup.controller - This module provides functions for user signup.
 * @requires ../controllers/user-verify-status.controller - This module provides functions for user account verification.
 * @requires ../controllers/user-signin.controller - This module provides functions for user signin.
 * @requires ../controllers/user-reset-password.controller - This module provides functions for user password reset.
 */

const { verifySignUp } = require("../middlewares");
const signupController = require("../controllers/user-signup.controller");
const verifyUserStatus = require("../controllers/user-verify-status.controller");
const signinController = require("../controllers/user-signin.controller");
const resetPasswordController = require("../controllers/user-reset-password.controller");

/**
 * @function
 * @description Aggregates routes for user signup, signin, and account verification.
 * @see {@link module:../middlewares} - This module provides middlewares used here.
 * @see {@link module:../controllers/user-signup.controller} - This module provides functions for user signup.
 * @see {@link module:../controllers/user-verify-status.controller} - This module provides functions for user account verification.
 * @see {@link module:../controllers/user-signin.controller} - This module provides functions for user signin.
 * @see {@link module:../controllers/user-reset-password.controller} - This module provides functions for user password reset.
 * @param {import('express').Application} app - The Express application object.
 */
module.exports = function (app) {
  /**
   * @function
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
   * @name signup
   * @function
   * @group Auth - Operations related to authentication
   * @description This route is used for user signup.
   * @path {POST} /api/auth/signup
   * @see {@link module:../middlewares} - This module provides middlewares used here.
   * @middleware checkDuplicateUsernameOrEmail - Checks for duplicate username or email and prevents registration if found.
   * @middleware checkRolesExisted - Validates if the roles provided exist in the database.
   * @see {@link module:UserSignup.signup}
   * @param {User.model} user.body.required - User details
   * @example <caption>Example request body:</caption>
   * {
      "username": "john",
      "email": "john-doe@gmail.com",
      "password": "StrongPassword123!",
      "status": "Pending",
      "roles": ["user"]
    }
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
   * @name verifyUserStatus
   * @function
   * @group Auth - Operations related to authentication
   * @description This route is used for user email verification.
   * @path {POST} /api/auth/verify/:confirmationCode
   * @see {@link module:UserVerificationController.verifyUserStatus}
   * @param {string} confirmationCode - The confirmation code for email verification.
   */
  app.post(
    "/api/auth/verify/:confirmationCode",
    verifyUserStatus.verifyUserStatus
  );

  /**
   * @name signin
   * @function
   * @group Auth - Operations related to authentication
   * @description This route is used for user signin.
   * @path {POST} /api/auth/signin
   * @see {@link module:UserSignin.signin}
   * @param {User.model} user.body.required - User details
   * @example <caption>Example request body:</caption>
   * {
      "username": "john",
      "password": "StrongPassword123!"
    }
   */
  app.post("/api/auth/signin", signinController.signin);

  /**
   * @name resetPasswordEmail
   * @function
   * @group Auth - Operations related to authentication
   * @description Envoie du mail permettant de générer un nouveau mot de passe.
   * @path {POST} /api/auth/email-reset-password/:email
   * @see {@link module:PasswordReset.sendEmailResetPassword}
   * @param {string} confirmationCode - The confirmation code for email verification.
   */
  app.post(
    "/api/auth/email-reset-password/:email",
    resetPasswordController.sendEmailResetPassword
  );

  /**
   * @name resetPassword
   * @function
   * @group Auth - Operations related to authentication
   * @description envoie du nouveau mot de passe.
   * @path {POST} /api/auth/reset-password/:confirmationCode
   * @see {@link module:PasswordReset.resetPassword}
   * @param {string} confirmationCode - The confirmation code for email verification.
   * @param {string} password - The new password.
   * @example <caption>Example request body:</caption>
   * {
   * "password": "StrongPassword123!"
   * }
   */
  app.post(
    "/api/auth/reset-password/:confirmationCode",
    resetPasswordController.resetPassword
  );
};
