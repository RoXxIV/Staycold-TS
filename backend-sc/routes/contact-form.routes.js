/**
 * @fileoverview Defines routes for contact form operations.
 */

/**
 * @module ContactRoutes
 * @description Defines the routes for contact form operations.
 * @requires ../controllers/contact-form.controller
 */
const controller = require("../controllers/contact-form.controller");

/**
 * Configures the routes for the contact form.
 *
 * @function
 * @param {Object} app - The Express application object.
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
   * POST route to handle contact form submissions.
   * @route POST /api/contact
   * @group Contact - Operations related to the contact form.
   * @returns {Object} 200 - JSON response with a success message.
   * @returns {Object} 400 - JSON response with an error message.
   */
  app.post("/api/contact", controller.handleFormContact);
};
