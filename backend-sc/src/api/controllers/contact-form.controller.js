/**
 * @fileoverview Handles operations related to the contact form.
 * @module ContactFormController
 * @description This module handles all operations related to the contact form.
 * @requires ../../plugins/nodemailer.config - Nodemailer configuration for sending emails.
 * @see {@link module:NodemailerConfig} - The Nodemailer configuration used for sending emails.
 * @exports module:ContactFormController
 */

// import dependencies
const nodemailer = require("../../plugins/nodemailer.config");
const errorMessages = require("../../utils/errorMessages");

/**
 * @function handleFormContact
 * @async
 * @description Handles the contact form submission and forwards the content to Staycold email.
 * @see {@link module:NodemailerConfig.sendContactMail} - The function that sends the email.
 * @see {@link module:ContactRoutes} - This function is used in the POST /api/contact route.
 * @param {Object} req - Express request object containing the form data in the body.
 * @param {string} req.body.email - The contact email.
 * @param {string} req.body.subject - The subject of the email.
 * @param {string} req.body.commentary - The message body.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a success or error message.
 * @throws {BadRequest} JSON response with a 400 status if the request body is empty.
 * @throws {InternalServerError} JSON response with a 500 status if an internal server error occurs.
 * @example app.post("/api/contact", controller.handleFormContact);
 */
exports.handleFormContact = async (req, res, next) => {
  try {
    // Check if the request body is empty
    if (req.body) {
      // Send the email
      await nodemailer.sendContactMail(
        req.body.email,
        req.body.subject,
        req.body.commentary
      );
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        message: `Votre message a bien été envoyé,
        il sera traitée dans les meilleurs délais`,
      });
    } else {
      res.status(400).json({
        message: "Une erreur est survenue",
      });
    }
  } catch (error) {
    res.status(500).json({
      // console.log("Caught an error:", error); // Debug log
      message: errorMessages.INTERNAL_SERVER_ERROR,
    });
  }
};
