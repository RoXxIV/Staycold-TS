/**
 * @fileoverview Defines and configures the routes for bath-related operations.
 * @module BathRoutes
 * @namespace BathRoutes
 * @description This module defines and configures the routes for all CRUD operations related to baths.
 * @requires ../controllers/bath.controller - The bath controller that handles the logic.
 * @requires ../middlewares - Middleware for authentication and other functionalities.
 */

// Import the bath controller and authentication middleware
const controller = require("../controllers/bath.controller");
const { authJwt } = require("../middlewares");

/**
 * @function
 * @description Aggregates routes for bath-related operations.
 * @see {@link module:../controllers/bath.controller} - This module provides functions for bath CRUD operations.
 * @see {@link module:../middlewares} - This module provides middlewares used here.
 * @param {import('express').Application} app - Express app.
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
   * @name createBath
   * @function
   * @description POST route to create a new bath record.
   * @group Bath - Operations related to baths
   * @path {POST} /api/bath
   * @see {@link module:BathController.createBath} - The function that handles this route.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @middleware verifyToken - Verifies the JWT token.
   * @param {Bath.model} bath.body.required - Bath details
   * @security JWT
   * @response {Bath.model} 201 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @example <caption>Example request body:</caption>
   * {
      "author": "653c0489c189acbc95ec5fa7",
      "waterTemperature": 1,
      "timeInWater": 1,
      "temperatureOutside": 1,
      "weather": "ensoleillé",
      "wind": "leger",
      "recoveryTime": 1,
      "afterdrop": "modéré",
      "globalFeeling": "facile",
      "commentary": "It was a refreshing experience."
      }
   */
  app.post("/api/bath", [authJwt.verifyToken], controller.createBath);

  /**
   * @name modifyBath
   * @function
   * @description PUT route to modify an existing bath record by ID.
   * @group Bath - Operations related to baths
   * @path {PUT} /api/bath/:id
   * @see {@link module:BathController.modifyBath} - The function that handles this route.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @middleware verifyToken - Verifies the JWT token.
   * @param {string} id.path.required - Bath ID
   * @param {Bath.model} bath.body.required - Updated bath details
   * @security JWT
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @example <caption>Example request body:</caption>
   * {
      "author": "653c0489c189acbc95ec5fa7",
      "waterTemperature": 1,
      "timeInWater": 1,
      "temperatureOutside": 1,
      "weather": "ensoleillé",
      "wind": "leger",
      "recoveryTime": 1,
      "afterdrop": "modéré",
      "globalFeeling": "facile",
      "commentary": "It was a refreshing experience."
      }
   */
  app.put("/api/bath/:id", [authJwt.verifyToken], controller.modifyBath);

  /**
   * @name deleteBath
   * @function
   * @description DELETE route to delete an existing bath record by ID.
   * @group Bath - Operations related to baths
   * @path {DELETE} /api/bath/:id
   * @see {@link module:BathController.deleteBath} - The function that handles this route.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @middleware verifyToken - Verifies the JWT token.
   * @param {string} id.path.required - Bath ID
   * @security JWT
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   */
  app.delete("/api/bath/:id", [authJwt.verifyToken], controller.deleteBath);

  /**
   * @name getAllBaths
   * @function
   * @description GET route to retrieve all bath records.
   * @group Bath - Operations related to baths
   * @path {GET} /api/bath
   * @see {@link module:BathController.getAllBaths} - The function that handles this route.
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @returns {Array.<Bath>} 200 - An array of bath records
   *
   */
  app.get("/api/bath", controller.getAllBaths);

  /**
   * @name getOneBath
   * @function
   * @description GET route to retrieve a single bath record by ID.
   * @group Bath - Operations related to baths
   * @route GET /api/bath/:id
   * @see {@link module:BathController.getOneBath} - The function that handles this route.
   * @param {string} id.path.required - Bath ID
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @returns {Bath.model} 200 - A single bath record
   */
  app.get("/api/bath/:id", controller.getOneBath);

  /**
   * @name getAllBathsByUser
   * @function
   * @description GET route to retrieve all bath records by user ID.
   * @group Bath - Operations related to baths
   * @route GET /api/bath/user/:userId
   * @see {@link module:BathController.getAllBathsByUser} - The function that handles this route.
   * @param {string} id.path.required - User ID
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @returns {Array.<Bath>} 200 - An array of bath records for the user
   */
  app.get("/api/bath/user/:userId", controller.getAllBathsByUser);

  /**
   * @name getRecentBaths
   * @function
   * @description GET route to retrieve all recent baths.
   * @group Bath - Operations related to baths
   * @route GET /api/bath/recent/:limit
   * @see {@link module:BathController.getRecentBaths} - The function that handles this route.
   * @param {number} limit.path.required - Number of recent baths to retrieve
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @returns {Array.<Bath>} 200 - An array of recent bath records
   */
  app.get("/api/bath/recent/:limit", controller.getRecentBaths);
};
