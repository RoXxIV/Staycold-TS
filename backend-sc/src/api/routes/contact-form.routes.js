/**
 * @fileoverview Defines and configures the routes for contact form operations.
 * @module ContactRoutes
 * @description Defines the routes for contact form operations.
 * @requires ../controllers/contact-form.controller - ContactFormController
 */
const controller = require("../controllers/contact-form.controller");

module.exports = function (app) {
  /**
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
   * @name POST /api/contact
   * @description POST route to handle contact form submissions.
   * @see {@link module:ContactFormController.handleFormContact}
   * @returns {Object} 200 - JSON response with a success message.
   * @returns {Object} 400 - JSON response with an error message.
   * @security None - This route does not require authentication.
   * @example <caption>Example</caption>
   * app.post("/api/contact", controller.handleFormContact);
   * @example <caption>Example request body:</caption>
   * {
      "contact": "john.doe@example.com",
      "subject": "Inquiry about your services",
      "message": "Hello, I am interested in your services and would like to know more. Please get back to me at your earliest convenience."
     }
    * @example <caption>Example response</caption>
    * {
    * "message": "Votre message a bien été envoyé,
        il sera traitée dans les meilleurs délais"
    * }
   */
  app.post("/api/contact", controller.handleFormContact);
};
