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
   */
  app.post("/api/bath", [authJwt.verifyToken], controller.createBath);
  /**
   * PUT route to modify an existing bath record by ID.
   * Requires a verified token.
   */
  app.put("/api/bath/:id", [authJwt.verifyToken], controller.modifyBath);
  /**
   * DELETE route to delete an existing bath record by ID.
   * Requires a verified token.
   */
  app.delete("/api/bath/:id", [authJwt.verifyToken], controller.deleteBath);
};
