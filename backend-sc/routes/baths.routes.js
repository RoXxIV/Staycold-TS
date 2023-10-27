/**
 * @fileoverview Defines routes for bath-related operations.
 */

/**
 * @module BathRoutes
 * @description Defines the routes for bath-related operations.
 * @requires ../controllers/bath.controller
 * @requires ../middlewares
 */

// Import the bath controller and authentication middleware
const controller = require("../controllers/bath.controller");
const { authJwt } = require("../middlewares");

/**
 * Configures the bath-related routes.
 *
 * @function
 * @param {Object} app - The Express application object.
 */
module.exports = function (app) {
  /**
   * Middleware to set headers for CORS and tokens.
   *
   * @function
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
   * POST route to create a new bath record.
   * Requires a verified token.
   * @route POST /api/bath
   * @group Bath - Operations related to baths
   * @param {Bath.model} bath.body.required - Bath details
   * @returns {Object} 201 - JSON response with a success message
   * @returns {Error} 400 - JSON response with an error message
   * @security JWT
   */
  app.post("/api/bath", [authJwt.verifyToken], controller.createBath);

  /**
   * PUT route to modify an existing bath record by ID.
   * Requires a verified token.
   * @route PUT /api/bath/:id
   * @group Bath - Operations related to baths
   * @param {string} id.path.required - Bath ID
   * @param {Bath.model} bath.body.required - Updated bath details
   * @returns {Object} 200 - JSON response with a success message
   * @returns {Error} 400 - JSON response with an error message
   * @security JWT
   */
  app.put("/api/bath/:id", [authJwt.verifyToken], controller.modifyBath);

  /**
   * DELETE route to delete an existing bath record by ID.
   * Requires a verified token.
   * @route DELETE /api/bath/:id
   * @group Bath - Operations related to baths
   * @param {string} id.path.required - Bath ID
   * @returns {Object} 200 - JSON response with a success message
   * @returns {Error} 400 - JSON response with an error message
   * @returns {Error} 403 - JSON response if the user is not authorized
   * @security JWT
   */
  app.delete("/api/bath/:id", [authJwt.verifyToken], controller.deleteBath);

  /**
   * GET route to retrieve all bath records.
   * @route GET /api/bath
   * @group Bath - Operations related to baths
   * @returns {Array.<Bath>} 200 - An array of bath records
   */
  app.get("/api/bath", controller.getAllBaths);

  /**
   * GET route to retrieve a single bath record by ID.
   * @route GET /api/bath/:id
   * @group Bath - Operations related to baths
   * @param {string} id.path.required - Bath ID
   * @returns {Bath.model} 200 - A single bath record
   */
  app.get("/api/bath/:id", controller.getOneBath);

  /**
   * GET route to retrieve all bath records by user ID.
   * @route GET /api/bath/user/:userId
   * @group Bath - Operations related to baths
   * @param {string} id.path.required - User ID
   * @returns {Array.<Bath>} 200 - An array of bath records for the user
   */
  app.get("/api/bath/user/:userId", controller.getAllBathsByUser);

  /**
   * GET route to retrieve all recent bath.
   * @route GET /api/bath/recent/:limit
   * @group Bath - Operations related to baths
   * @param {number} limit.path.required - Number of recent baths to retrieve
   * @returns {Array.<Bath>} 200 - An array of recent bath records
   */
  app.get("/api/bath/recent/:limit", controller.getRecentBaths);
};
