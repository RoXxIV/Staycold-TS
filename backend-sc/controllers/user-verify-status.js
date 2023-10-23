/**
 * @module UserVerificationController
 * @requires dotenv
 * @requires ../models
 */
const dotenv = require("dotenv");
const db = require("../models");

const User = db.user;

dotenv.config();

/**
 * Change the status of the user account after email verification.
 *
 * @async
 * @function
 * @param {Object} req - Express request object containing the confirmation code as a parameter.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with a message indicating the account activation status.
 * @throws {Object} JSON response with a 401 status if the user is not found.
 * @throws {Object} JSON response with a 403 status if the email has already been verified.
 * @throws {Object} JSON response with a 500 status if an error occurs.
 */
exports.verifyUserStatus = async (req, res) => {
  try {
    const user = await User.findOne({
      confirmationCode: req.params.confirmationCode,
    });

    // Incorrect confirmation code
    if (!user) {
      return res.status(401).send({ message: "Utilisateur non trouvé." });
    }

    // If the profile has already been activated
    if (user.status === "Active") {
      return res.status(403).send({
        message: "Cet email a déjà été vérifié",
      });
    }

    user.status = "Active";

    // Saving the new user state
    await user.save();

    res.json({ message: "Le compte a bien été activé!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
