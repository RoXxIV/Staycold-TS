/**
 * @fileoverview Defines and configures the routes for bath-related operations.
 * @module BathRoutes
 * @description This module defines and configures the routes for all CRUD operations related to baths.
 * @requires ../controllers/bath.controller - The bath controller that handles the logic.
 * @requires ../middlewares - Middleware for authentication and other functionalities.
 */

// Import the bath controller and authentication middleware
const controller = require("../controllers/bath.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  /**
   * @memberof BathRoutes
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
   * @name POST /api/bath
   * @description POST route to create a new bath record.
   * @see {@link module:BathController.createBath} - The function that handles this route.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @param {Bath.model} bath.body.required - Bath details
   * @security JWT
   * @response {Bath.model} 201 - JSON response with a success message.
   * @response {Error} 400 - Bad request
    * @example <caption>Example</caption>
    * app.post("/api/bath", [authJwt.verifyToken], controller.createBath);
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
      @example <caption>Example response</caption>
      { "message": "Votre baignade a bien été enregistré" }
   */
  app.post("/api/bath", [authJwt.verifyToken], controller.createBath);

  /**
   * @name PUT /api/bath/:id
   * @description PUT route to modify an existing bath record by ID.
   * @see {@link module:BathController.modifyBath} - The function that handles this route.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @param {string} id.path.required - Bath ID
   * @param {Bath.model} bath.body.required - Updated bath details
   * @security JWT
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @example <caption>Example</caption>
   * app.put("/api/bath/:id", [authJwt.verifyToken], controller.modifyBath);
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
      @example <caption>Example response</caption>
      { "message": "Votre baignade a bien été modifié" }
   */
  app.put("/api/bath/:id", [authJwt.verifyToken], controller.modifyBath);

  /**
   * @name DELETE /api/bath/:id
   * @description DELETE route to delete an existing bath record by ID.
   * @see {@link module:BathController.deleteBath} - The function that handles this route.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @param {string} id.path.required - Bath ID
   * @security JWT
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @example <caption>Example</caption>
   * app.delete("/api/bath/:id", [authJwt.verifyToken], controller.deleteBath);
   * @example <caption>Example response</caption>
   * { "message": "Votre baignade a bien été supprimé" }
   */
  app.delete("/api/bath/:id", [authJwt.verifyToken], controller.deleteBath);

  /**
   * @name GET /api/bath
   * @description GET route to retrieve all bath records.
   * @see {@link module:BathController.getAllBaths} - The function that handles this route.
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @returns {Array.<Bath>} 200 - An array of bath records
   * @example <caption>Example</caption>
   * app.get("/api/bath", controller.getAllBaths);
   * @example <caption>Example response</caption>
   * [
	{
		"_id": "653c04e5c125acbc95ec5fbd",
		"author": {
			"_id": "653c0489c189agfc95ec5fa7",
			"username": "Marion"
		},
		"waterTemperature": 1,
		"timeInWater": 1,
		"temperatureOutside": 1,
		"weather": "ensoleillé",
		"wind": "leger",
		"recoveryTime": 1,
		"afterdrop": "modéré",
		"globalFeeling": "facile",
		"commentary": "It was a refreshing experience.",
		"createdAt": "2023-10-27T18:43:49.068Z",
		"updatedAt": "2023-10-27T18:43:49.068Z",
		"__v": 0
	},
	{
		"_id": "653c04e4c189acbc95ec5fba",
		"author": {
			"_id": "653c0489c189acbc95ec5fa7",
			"username": "Denis"
      ...}
    ]
   */
  app.get("/api/bath", controller.getAllBaths);

  /**
   * @name GET /api/bath/:id
   * @description GET route to retrieve a single bath record by ID.
   * @see {@link module:BathController.getOneBath} - The function that handles this route.
   * @param {string} id.path.required - Bath ID
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @returns {Bath.model} 200 - A single bath record
   * @example <caption>Example</caption>
   * app.get("/api/bath/:id", controller.getOneBath);
   * @example <caption>Example response</caption>
   * [
	{
		"_id": "653c04e5c125acbc95ec5fbd",
		"author": {
			"_id": "653c0489c189agfc95ec5fa7",
			"username": "Marion"
		},
		"waterTemperature": 1,
		"timeInWater": 1,
		"temperatureOutside": 1,
		"weather": "ensoleillé",
		"wind": "leger",
		"recoveryTime": 1,
		"afterdrop": "modéré",
		"globalFeeling": "facile",
		"commentary": "It was a refreshing experience.",
		"createdAt": "2023-10-27T18:43:49.068Z",
		"updatedAt": "2023-10-27T18:43:49.068Z",
		"__v": 0
	}
]
   */
  app.get("/api/bath/:id", controller.getOneBath);

  /**
   * @name GET /api/bath/user/:userId
   * @description GET route to retrieve all bath records by user ID.
   * @see {@link module:BathController.getAllBathsByUser} - The function that handles this route.
   * @param {string} id.path.required - User ID
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @returns {Array.<Bath>} 200 - An array of bath records for the user
   * @example <caption>Example</caption>
   * app.get("/api/bath/user/:userId", controller.getAllBathsByUser);
   * @example <caption>Example response</caption>
   * [
	{
		"_id": "653c04e5c125acbc95ec5fbd",
		"author": {
			"_id": "653c0489c189agfc95ec5fa7",
			"username": "Marion"
		},
		"waterTemperature": 1,
		"timeInWater": 1,
		"temperatureOutside": 1,
		"weather": "ensoleillé",
		"wind": "leger",
		"recoveryTime": 1,
		"afterdrop": "modéré",
		"globalFeeling": "facile",
		"commentary": "It was a refreshing experience.",
		"createdAt": "2023-10-27T18:43:49.068Z",
		"updatedAt": "2023-10-27T18:43:49.068Z",
		"__v": 0
	}
]
   */
  app.get("/api/bath/user/:userId", controller.getAllBathsByUser);

  /**
   * @name GET /api/bath/recent/:limit
   * @description GET route to retrieve all recent baths.
   * @see {@link module:BathController.getRecentBaths} - The function that handles this route.
   * @param {number} limit.path.required - Number of recent baths to retrieve
   * @response {Bath.model} 200 - JSON response with a success message.
   * @response {Error} 400 - Bad request
   * @returns {Array.<Bath>} 200 - An array of recent bath records
   * @example <caption>Example</caption>
   * app.get("/api/bath/recent/:limit", controller.getRecentBaths);
   * @example <caption>Example response</caption>
   * [
	{
		"_id": "653c04e5c125acbc95ec5fbd",
		"author": {
			"_id": "653c0489c189agfc95ec5fa7",
			"username": "Marion"
		},
		"waterTemperature": 1,
		"timeInWater": 1,
		"temperatureOutside": 1,
		"weather": "ensoleillé",
		"wind": "leger",
		"recoveryTime": 1,
		"afterdrop": "modéré",
		"globalFeeling": "facile",
		"commentary": "It was a refreshing experience.",
		"createdAt": "2023-10-27T18:43:49.068Z",
		"updatedAt": "2023-10-27T18:43:49.068Z",
		"__v": 0
	},
	{
		"_id": "653c04e4c189acbc95ec5fba",
		"author": {
			"_id": "653c0489c189acbc95ec5fa7",
			"username": "Denis"
      ...}
    ]
   */
  app.get("/api/bath/recent/:limit", controller.getRecentBaths);
};
