/**
 * @fileoverview Bath Controller - Defines the controller for bath-related operations.
 * @module BathController
 * @description This module handles all CRUD operations related to baths.
 * @requires ../models - Database models needed for bath operations.
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

// Import dependencies
const db = require("../models");

const Bath = db.bath;
const User = db.user;

// Define the sort options for bath records
const sortOptions = { createdAt: -1 };

/**
 * @function createBath
 * @async
 * @description Creates a new Bath record in the database.
 * @see {@link module:BathRoutes} - This function is used in the POST /api/bath route.
 * @param {Object} req - Express request object, containing the Bath details in the body.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a success message and the newly created bath.
 * @throws {BadRequest} JSON response with a 400 status if an error occurs.
 * @example
 * // Route definition in another file
 * app.post("/api/bath", [authJwt.verifyToken], controller.createBath);
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
    const savedBath = await bath.save();

    // Send a success message as a JSON response
    res.status(201).json({ message: "Baignade enregistré !", bath: savedBath });
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(400).json({ error });
  }
};

/**
 * @function modifyBath
 * @async
 * @description Modifies an existing Bath record in the database.
 * @see {@link module:BathRoutes} - This function is used in the PUT /api/bath/:id route.
 * @param {Object} req - Express request object, containing the Bath ID in `req.params.id` and updated details in `req.body`.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a success message.
 * @throws {BadRequest} JSON response with a 400 status if an error occurs.
 * @example
 * // Route definition in another file
 * app.put("/api/bath/:id", [authJwt.verifyToken], controller.modifyBath);
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
    // Update the bath record
    await Bath.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    );
    const updatedBath = await Bath.findById(req.params.id);
    // Send a success message as a JSON response
    res.status(200).json({ message: "Baignade edité !", bath: updatedBath });
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(400).json({ error });
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
 * @returns {Object} JSON response with a success message.
 * @throws {BadRequest} JSON response with a 400 status if an error occurs.
 * @throws {NotFound} JSON response with a 404 status if the bath is not found.
 * @example
 * // Route definition in another file
 * app.delete("/api/bath/:id", [authJwt.verifyToken], controller.deleteBath);
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
    // Delete the bath record and get the deleted record
    const deletedBath = await Bath.findOneAndDelete({ _id: req.params.id });

    if (!deletedBath) {
      return res.status(404).json({ message: "Baignade non trouvée." });
    }

    // Send a success message as a JSON response
    res.status(200).json({ message: "Baignade supprimé !", bath: deletedBath });
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(400).json({ error });
  }
};

/**
 * @function getAllBaths
 * @async
 * @description Fetches all baths from the database.
 * @see {@link module:BathRoutes} - This function is used in the GET /api/bath route.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} JSON response with a success message.
 * @throws {BadRequest} JSON response with a 400 status if an error occurs.
 * @example
 * // Route definition in another file
 * app.get("/api/bath", controller.getAllBaths);
 */
exports.getAllBaths = async (req, res, next) => {
  try {
    // Fetch all baths from the database
    const baths = await Bath.find()
      .sort(sortOptions)
      .populate("author", "username");

    // Send the fetched baths as a JSON response
    res.status(200).json(baths);
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(400).json({ error });
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
 * @returns {Object} JSON response with a success message.
 * @throws {BadRequest} JSON response with a 400 status if an error occurs.
 * @example
 * // Route definition in another file
 * app.get("/api/bath/:id", controller.getOneBath);
 */
exports.getOneBath = async (req, res, next) => {
  try {
    // Fetch a single bath by ID
    const bath = await Bath.findOne({ _id: req.params.id }).populate(
      "author",
      "username"
    );

    // If the bath is not found, return a 404 error
    if (!bath) {
      return res.status(404).json({ message: "Bath not found" });
    }

    // Send the fetched bath as a JSON response
    res.status(200).json(bath);
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(400).json({ error });
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
 * @returns {Object} JSON response with the fetched baths.
 * @throws {BadRequest} JSON response with a 400 status if an error occurs.
 * @example
 * // Route definition in another file
 * app.get("/api/bath/recent/:limit", controller.getRecentBaths);
 */
exports.getRecentBaths = async (req, res, next) => {
  try {
    const limit = Number(req.params.limit);
    // Fetch recent baths
    const baths = await Bath.find()
      .limit(limit)
      .sort(sortOptions)
      .populate("author", "username -_id");

    // Send the fetched baths as a JSON response
    res.status(200).json(baths);
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(400).json({ error });
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
 * @returns {Object} JSON response with a success message.
 * @throws {BadRequest} JSON response with a 400 status if an error occurs.
 * @example
 * // Route definition in another file
 * app.get("/api/bath/recent/:limit", controller.getRecentBaths);
 */
exports.getAllBathsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    // Fetch baths belonging to a single user
    const baths = await Bath.find({ author: userId })
      .sort(sortOptions)
      .populate("author", "username");

    // Send the fetched baths as a JSON response
    res.status(200).json(baths);
  } catch (error) {
    // console.log("Caught an error:", error); // Debug log
    res.status(400).json({ error });
  }
};
