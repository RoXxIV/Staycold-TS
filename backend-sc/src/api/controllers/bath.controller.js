/**
 * @module BathController
 * @description Defines the controller for bath-related operations.
 * @requires ModelsIndex - Database models needed for bath operations.
 * @requires ErrorMessages - Error messages for different HTTP status codes.
 * @exports createBath - Creates a new Bath record in the database.
 * @exports modifyBath - Modifies an existing Bath record in the database.
 * @exports deleteBath - Delete an existing Bath record in the database.
 * @exports getAllBaths - Fetches all baths from the database.
 * @exports getOneBath - Fetches a single bath by ID.
 * @exports getRecentBaths - Fetches a specified number of recent baths.
 * @exports getAllBathsByUser - Fetches baths belonging to a single user.
 * @see {@link module:BathRoutes} - This module provides routes for bath-related operations.
 * @see {@link module:BathModel} - This module provides the Bath model.
 * @see {@link module:UserModel} - This module provides the User model.
 * @see {@link module:UserRoutes} - This module provides routes for user-related operations.
 */

const mongoose = require("mongoose");
const errorMessages = require("../../utils/errorMessages");

// import database models
const db = require("../../models");
const Bath = db.bath;
const User = db.user;

// Define the sort options for bath records
const sortOptions = { createdAt: -1 };

// Define the required fields for bath records
const requiredFields = [
  "author",
  "waterTemperature",
  "timeInWater",
  "temperatureOutside",
  "weather",
];

/**
 * @function createBath
 * @async
 * @description Creates a new Bath record in the database and returns the newly created record.
 * @see {@link module:BathRoutes} - This function is used in the POST /api/bath route.
 * @param {Object} req - Express request object, containing the Bath details in the body.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a 201 status and a success message and the newly created bath.
 * @throws {BadRequest} JSON response with a 500 status if an error occurs.
 * @throws {BadRequest} JSON response with a 400 status if a required field is missing.
 * @throws {BadRequest} JSON response with a 400 status if the user ID is invalid.
 * @throws {NotFound} JSON response with a 404 status if the user is not found.
 * @example app.post("/api/bath", [authJwt.verifyToken], controller.createBath);
 */
exports.createBath = async (req, res, next) => {
  try {
    delete req.body._id; // Remove the fake_id sent by the front-end

    // Verify if all required fields are present
    for (const field of requiredFields) {
      if (!req.body.hasOwnProperty(field)) {
        console.log(`Missing field: ${field}`); // Debug log
        return res.status(400).json({ message: "Champs requis manquants." });
      }
    }
    const userId = req.userId;

    // Check if userId is valid and if it exists
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: errorMessages.GENERIC_ERROR });
    }
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: errorMessages.GENERIC_ERROR });
    }

    // Create and save a new bath record
    const bath = new Bath({ ...req.body });
    const savedBath = await bath.save();

    res.status(201).json({
      message: "La baignade a correctement été enregistrée.",
      bath: savedBath,
    });
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

/**
 * @function modifyBath
 * @async
 * @description Modifies an existing Bath record in the database and returns the updated record.
 * @see {@link module:BathRoutes} - This function is used in the PUT /api/bath/:id route.
 * @param {Object} req - Express request object, containing the Bath ID in `req.params.id` and updated details in `req.body`.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a 200 status and a success message.
 * @throws {BadRequest} JSON response with a 500 status if an error occurs.
 * @throws {BadRequest} JSON response with a 400 status if a required field is missing.
 * @throws {BadRequest} JSON response with a 400 status if the user ID is invalid.
 * @throws {NotFound} JSON response with a 404 status if the bath is not found.
 * @throws {NotFound} JSON response with a 404 status if the user is not found.
 * @example app.put("/api/bath/:id", [authJwt.verifyToken], controller.modifyBath);
 */
exports.modifyBath = async (req, res, next) => {
  try {
    // Verify if all required fields are present
    for (const field of requiredFields) {
      if (!req.body.hasOwnProperty(field)) {
        return res.status(400).json({ message: "Champs requis manquants." });
      }
    }

    const userId = req.body.author;

    // Check if userId is valid and if it exists
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: errorMessages.GENERIC_ERROR });
    }
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: errorMessages.GENERIC_ERROR });
    }

    // Verify if the bath exists
    const bathExists = await Bath.findById(req.params.id);
    if (!bathExists) {
      return res.status(404).json({ message: errorMessages.GENERIC_ERROR });
    }

    // Update the bath record
    await Bath.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    );
    const updatedBath = await Bath.findById(req.params.id);

    res.status(200).json({ message: "Baignade edité !", bath: updatedBath });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: errorMessages.GENERIC_ERROR });
    }
    // console.log("Caught an error:", error); // Debug log
    res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

/**
 * @function deleteBath
 * @async
 * @description Delete an existing Bath record in the database.
 * @see {@link module:BathRoutes} - This function is used in the DELETE /api/bath/:id route.
 * @param {Object} req - Express request object, containing the Bath ID in `req.params.id`.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a 200 status and a success message.
 * @throws {BadRequest} JSON response with a 500 status if an error occurs.
 * @throws {BadRequest} JSON response with a 400 status if the bath ID is invalid.
 * @throws {BadRequest} JSON response with a 400 status if the user ID is invalid.
 * @throws {NotFound} JSON response with a 404 status if the bath is not found.
 * @throws {NotFound} JSON response with a 404 status if the user is not found.
 * @example app.delete("/api/bath/:id", [authJwt.verifyToken], controller.deleteBath);
 */
exports.deleteBath = async (req, res, next) => {
  // Verify if the bath ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Baignade non trouvée." });
  }

  try {
    const userId = req.body.author;

    // Check if userId is valid and if it exists
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: errorMessages.GENERIC_ERROR });
    }
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: errorMessages.GENERIC_ERROR });
    }

    // Delete the bath record and get the deleted record
    const deletedBath = await Bath.findOneAndDelete({ _id: req.params.id });
    if (!deletedBath) {
      return res.status(404).json({ message: "Baignade non trouvée." });
    }

    res.status(200).json({ message: "Baignade supprimé !", bath: deletedBath });
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

/**
 * @function getAllBaths
 * @async
 * @description Fetches all baths from the database
 * @see {@link module:BathRoutes} - This function is used in the GET /api/bath route with pagination.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a 200 status and the fetched baths and the total number of baths.
 * @throws {BadRequest} JSON response with a 500 status if an error occurs.
 * @example app.get("/api/bath", controller.getAllBaths);
 */
exports.getAllBaths = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const skipIndex = (page - 1) * limit;

  try {
    // Fetch all baths from the database
    const baths = await Bath.find()
      .sort(sortOptions)
      .skip(skipIndex)
      .limit(limit)
      .populate("author", "username");

    const total = await Bath.countDocuments();
    res.status(200).json({ baths, total });
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

/**
 * @function getOneBath
 * @async
 * @description Fetches a single bath by ID.
 * @see {@link module:BathRoutes} - This function is used in the GET /api/bath/:id route.
 * @param {Object} req - Express request object, containing the Bath ID in `req.params.id`.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a 200 status and the fetched bath.
 * @throws {BadRequest} JSON response with a 500 status if an error occurs.
 * @throws {BadRequest} JSON response with a 400 status if the bath ID is invalid.
 * @throws {NotFound} JSON response with a 404 status if the bath is not found.
 * @example app.get("/api/bath/:id", controller.getOneBath);
 */
exports.getOneBath = async (req, res, next) => {
  try {
    // Check if the bath ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: errorMessages.GENERIC_ERROR });
    }

    // Fetch a single bath by ID
    const bath = await Bath.findOne({ _id: req.params.id }).populate(
      "author",
      "username"
    );

    // If the bath is not found, return a 404 error
    if (!bath) {
      return res.status(404).json({ message: errorMessages.GENERIC_ERROR });
    }

    res.status(200).json(bath);
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

/**
 * @function getRecentBaths
 * @async
 * @description Fetches a specified number of recent baths.
 * @see {@link module:BathRoutes} - This function is used in the GET /api/bath/recent/:limit route.
 * @param {Object} req - Express request object, containing the limit in `req.params.limit`.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a 200 status and the fetched baths.
 * @throws {BadRequest} JSON response with a 500 status if an error occurs.
 * @throws {BadRequest} JSON response with a 400 status if the limit is missing.
 * @throws {NotFound} JSON response with a 400 status if the limit is invalid.
 * @example app.get("/api/bath/recent/:limit", controller.getRecentBaths);
 */
exports.getRecentBaths = async (req, res, next) => {
  try {
    // check if limit exists
    if (!req.params.limit) {
      return res.status(400).json({ message: errorMessages.GENERIC_ERROR });
    }

    // Get the limit from the request parameters and check if the limit is valid
    const limit = Number(req.params.limit);
    if (isNaN(limit) || limit !== 4) {
      return res.status(400).json({ message: errorMessages.GENERIC_ERROR });
    }

    // Fetch recent baths
    const baths = await Bath.find()
      .limit(limit)
      .sort(sortOptions)
      .populate("author", "username -_id");

    res.status(200).json(baths);
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

/**
 * @function getAllBathsByUser
 * @async
 * @description Fetches baths belonging to a single user.
 * @see {@link module:BathRoutes} - This function is used in the GET /api/bath/user/:userId route.
 * @param {Object} req - Express request object, containing the User ID in `req.params.userId`.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object}  JSON response with a 200 status and the fetched baths.
 * @throws {BadRequest} JSON response with a 500 status if an error occurs.
 * @throws {BadRequest} JSON response with a 400 status if the user ID is invalid.
 * @throws {NotFound} JSON response with a 404 status if the user is not found.
 * @example app.get("/api/bath/recent/:limit", controller.getRecentBaths);
 */
exports.getAllBathsByUser = async (req, res, next) => {
  try {
    // Check if userId is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: errorMessages.GENERIC_ERROR });
    }

    // Verify if the user ID exists
    const userId = req.params.userId;
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: errorMessages.GENERIC_ERROR });
    }

    // Fetch baths belonging to a single user
    const baths = await Bath.find({ author: userId })
      .sort(sortOptions)
      .populate("author", "username");

    res.status(200).json(baths);
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};
