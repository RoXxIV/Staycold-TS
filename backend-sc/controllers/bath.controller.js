/**
 * @module BathController
 * @description Defines the controller for bath-related operations.
 * @requires ../models
 */
const db = require("../models");
const Bath = db.bath;
const User = db.user;

// Sorting options for the query
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

/**
 * Fetches all baths from the database.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response containing all baths.
 * @throws {Object} JSON response with a 400 status if an error occurs.
 */
exports.getAllBaths = async (req, res, next) => {
  try {
    const baths = await Bath.find()
      .sort(sortOptions)
      .populate("author", "username");
    res.status(200).json(baths);
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Fetches a single bath by ID.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response containing the bath information.
 * @throws {Object} JSON response with a 404 status if the bath is not found.
 */
exports.getOneBath = async (req, res, next) => {
  try {
    const bath = await Bath.findOne({ _id: req.params.id }).populate(
      "author",
      "username"
    );
    if (!bath) {
      return res.status(404).json({ message: "Bath not found" });
    }
    res.status(200).json(bath);
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Fetches recent baths, the number of which is defined on the client side.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response containing the recent baths.
 * @throws {Object} JSON response with a 400 status if an error occurs.
 */
exports.getRecentBaths = async (req, res, next) => {
  try {
    const limit = Number(req.params.limit);
    const baths = await Bath.find()
      .limit(limit)
      .sort(sortOptions)
      .populate("author", "username -_id");
    res.status(200).json(baths);
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Fetches baths belonging to a single user.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response containing the user's baths.
 * @throws {Object} JSON response with a 400 status if an error occurs.
 */
exports.getAllBathsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const baths = await Bath.find({ author: userId })
      .sort(sortOptions)
      .populate("author", "username");
    res.status(200).json(baths);
  } catch (error) {
    console.log("Caught an error:", error); // Debug log
    res.status(400).json({ error });
  }
};
