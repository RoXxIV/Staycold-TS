/**
 * @module ContactController
 * @description Handles operations related to the contact form.
 * @requires ../plugin/nodemailer.config
 */
const nodemailer = require("../plugins/nodemailer.config");

/**
 * Handles the contact form submission and forwards the content to Staycold email.
 *
 * @async
 * @function
 * @param {Object} req - Express request object containing the form data in the body.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a success or error message.
 * @throws {Object} JSON response with an error message if an error occurs.
 */
exports.handleFormContact = async (req, res, next) => {
  try {
    if (req.body) {
      await nodemailer.sendContactMail(
        req.body.contact,
        req.body.subject,
        req.body.message
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
    console.error("An error occurred while handling the contact form:", error);
    res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
};
