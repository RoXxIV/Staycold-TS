/**
 * @module BathController
 * @description Defines the controller for bath-related operations.
 * @requires ../models
 */
const db = require("../models");
const Bath = db.bath;
const User = db.user;

const sortOptions = { createdAt: -1 };
/**
 * Creates a new Bath record.
 *
 * @async
 * @function
 * @param {Object} req - Express request object, containing the Bath details in the body.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a success message.
 * @throws {Object} JSON response with a 400 status if an error occurs.
 */
exports.createBath = async (req, res, next) => {
  try {
    // Remove the fake_id sent by the front-end
    delete req.body._id;

    // Verify if the user ID exists
    const userId = req.body.author;
    const userExists = await User.findById(userId);

    if (!userExists) {
      // Return a generic error message or a misleading success message
      return res.status(400).json({ message: "Une erreur s'est produite." });
    }

    // Create a new bath record
    const bath = new Bath({
      ...req.body,
    });
    // Save the bath record
    await bath.save();

    res.status(201).json({ message: "Baignade enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Modifies an existing Bath record.
 *
 * @async
 * @function
 * @param {Object} req - Express request object, containing the Bath ID in params and updated details in the body.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a success message.
 * @throws {Object} JSON response with a 400 status if an error occurs.
 */
exports.modifyBath = async (req, res, next) => {
  try {
    // Verify if the user ID exists
    const userId = req.body.author;
    const userExists = await User.findById(userId);

    if (!userExists) {
      // Return a generic error message or a misleading success message
      return res.status(400).json({ message: "Une erreur s'est produite." });
    }

    await Bath.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    );
    res.status(200).json({ message: "Baignade edité !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Deletes an existing Bath record.
 *
 * @async
 * @function
 * @param {Object} req - Express request object, containing the Bath ID in params.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a success message.
 * @throws {Object} JSON response with a 400 status if an error occurs.
 */
exports.deleteBath = async (req, res, next) => {
  try {
    // Verify if the user ID exists
    const userId = req.body.author;
    const userExists = await User.findById(userId);

    if (!userExists) {
      // Return a generic error message or a misleading success message
      return res.status(400).json({ message: "Une erreur s'est produite." });
    }

    await Bath.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Baignade supprimé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
