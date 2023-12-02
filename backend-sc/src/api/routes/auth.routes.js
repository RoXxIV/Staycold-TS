/**
 * @module AuthRoutes
 * @description This module aggregates routes for user signup, signin, and account verification.
 * @requires Middlewares - Middleware for authentication and other functionalities.
 * @requires UserSignupController - This module provides functions for user signup.
 * @requires UserVerificationController - This module provides functions for user account verification.
 * @requires UserSigninController - This module provides functions for user signin.
 * @requires UserPasswordResetController - This module provides functions for user password reset.
 */

const { verifySignUp, signupValidatorRules } = require("../middlewares");
const signupController = require("../controllers/user-signup.controller");
const verifyUserStatus = require("../controllers/user-verify-status.controller");
const signinController = require("../controllers/user-signin.controller");
const resetPasswordController = require("../controllers/user-reset-password.controller");
const { validationResult } = require("express-validator");

module.exports = function (app) {
  /**
   * @memberof AuthRoutes
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
   * @name POST /api/auth/signup
   * @description This route is used for user signup.
   * @throws {Object} Will send a 422 status if the request body does not pass the validation.
   * @see {@link module:UserSignupController}
   * @see {@link module:UserSignupController.checkDuplicateUsernameOrEmail}
   * @see {@link module:UserSignupController.checkRolesExisted}
   * @see {@link https://express-validator.github.io/docs/|express-validator}
   * @param {User.model} user.body.required - User details
   * @example <caption>Example</caption>
   * app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      ...signupValidatorRules(),
    ],
    signupController.signup
  );
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
      ...signupValidatorRules(),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    },
    signupController.signup
  );

  /**
   * @name POST /api/auth/verify/:confirmationCode
   * @description This route is used for user account verification.
   * @see {@link module:UserVerificationController.verifyUserStatus}
   * @param {string} confirmationCode - The confirmation code for email verification.
   * @example <caption>Example</caption>
   * app.post(
    "/api/auth/verify/:confirmationCode",
    verifyUserStatus.verifyUserStatus
  );
  @example <caption>Example response</caption>
  {
    "message": "Votre compte a bien été vérifié"
  }
   */
  app.post(
    "/api/auth/verify/:confirmationCode",
    verifyUserStatus.verifyUserStatus
  );

  /**
   * @name POST /api/auth/signin
   * @description This route is used for user signin.
   * @path {POST} /api/auth/signin
   * @see {@link module:UserSignin.signin}
   * @param {User.model} user.body.required - User details
   * @example <caption>Example</caption>
   * app.post("/api/auth/signin", signinController.signin);
   * @example <caption>Example request body:</caption>
   * {
      "username": "john",
      "password": "StrongPassword123!"
    }
   */
  app.post("/api/auth/signin", signinController.signin);

  /**
   * @name POST /api/auth/email-reset-password
   * @description send email for reset password.
   * @see {@link module:PasswordReset.sendEmailResetPassword}
   * @param {string} confirmationCode - The confirmation code for email verification.
   * @example <caption>Example</caption>
   * app.post(
    "/api/auth/email-reset-password",
    resetPasswordController.sendEmailResetPassword
  );
  @example <caption>Example response</caption>
  {
    "message": "Un email a été envoyé à l'adresse indiquée"
  }
   */
  app.post(
    "/api/auth/email-reset-password",
    resetPasswordController.sendEmailResetPassword
  );

  /**
   * @name POST /api/auth/reset-password
   * @description reset password.
   * @see {@link module:PasswordReset.resetPassword}
   * @param {string} confirmationCode - The confirmation code for email verification.
   * @param {string} password - The new password.
   * @example <caption>Example</caption>
   * app.post(
    "/api/auth/reset-password",resetPasswordController.resetPassword);
   * @example <caption>Example request body:</caption>
   * {
   * "password": "StrongPassword123!"
   * }
   * @example <caption>Example response</caption>
   * {
   * "message": "Votre mot de passe a bien été modifié"
   * }
   */
  app.post("/api/auth/reset-password", resetPasswordController.resetPassword);
};
