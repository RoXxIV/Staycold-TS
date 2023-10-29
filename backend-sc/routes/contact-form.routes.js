/**
 * @fileoverview Defines and configures the routes for contact form operations.
 * @module ContactRoutes
 * @name ContactRoutes
 * @description Defines the routes for contact form operations.
 * @requires ../controllers/contact-form.controller - ContactFormController
 */
const controller = require("../controllers/contact-form.controller");

/**
 * @function
 * @description Configures the routes for contact form operations.
 * @see {@link module:ContactFormController} - This function uses the ContactFormController for handling routes.
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
   * @name handleFormContact
   * @function
   * @description POST route to handle contact form submissions.
   * @path {POST} /api/contact
   * @group Contact - Operations related to the contact form.
   * @see {@link module:ContactFormController.handleFormContact}
   * @returns {Object} 200 - JSON response with a success message.
   * @returns {Object} 400 - JSON response with an error message.
   * @security None - This route does not require authentication.
   * @example <caption>Example request body:</caption>
   * {
      "contact": "john.doe@example.com",
      "subject": "Inquiry about your services",
      "message": "Hello, I am interested in your services and would like to know more. Please get back to me at your earliest convenience."
     }
   */
  app.post("/api/contact", controller.handleFormContact);
};
