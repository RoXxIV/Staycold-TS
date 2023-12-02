/**
 * @module UserRoutes
 * @description Defines the routes for user-related operations.
 * @requires UserController - UserController
 * @requires Middlewares - authJwt
 */

const controller = require("../controllers/user.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  /**
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
   * @name GET /api/users/all
   * @description Route to get all users.
   * @see {@link module:UserController.findAllUsers} - This function uses the UserController for handling routes.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @see {@link module:AuthJwt.isModerator} - This function uses the isModerator middleware.
   * @returns {Object} 200 - JSON response containing all users.
   * @returns {Object} 400 - JSON response with an error message.
   * @security JWT
   * @example <caption>Example</caption>
   * app.get(
    "/api/users/all",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.findAllUsers
  );
   * @example <caption>Example response</caption>
   * [
	{
		"_id": "65397ab056b046754cebcb12",
		"username": "john",
		"email": "john.doe@gmail.com",
		"status": "Active",
		"roles": [
			{
				"_id": "65355ab097a4d34bf4956020",
				"name": "admin"
			}
		],
		"createdAt": "2023-10-25T20:29:36.373Z",
		"updatedAt": "2023-10-25T20:32:49.009Z",
		"__v": 1
	}
]
   */
  app.get(
    "/api/users/all",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.findAllUsers
  );

  /**
   * @name GET /api/users/:id
   * @description Route to get a single user by ID.
   * @see {@link module:UserController.getOneUser} - This function uses the getOneUser controller.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @see {@link module:AuthJwt.isModerator} - This function uses the isModerator middleware.
   * @returns {Object} 200 - JSON response containing the user.
   * @returns {Object} 400 - JSON response with an error message.
   * @security JWT
   * @example <caption>Example</caption>
   * app.get(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.getOneUser
  );
    * @example <caption>Example response</caption>
    * [
	{
		"_id": "65397ab056b046754cebcb12",
		"username": "john",
		"email": "john.doe@gmail.com",
		"status": "Active",
		"roles": [
			{
				"_id": "65355ab097a4d34bf4956020",
				"name": "admin"
			}
		],
		"createdAt": "2023-10-25T20:29:36.373Z",
		"updatedAt": "2023-10-25T20:32:49.009Z",
		"__v": 1
	}
]
   */
  app.get(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.getOneUser
  );

  /**
   * @name DELETE /api/users/:id
   * @description Route to delete a single user and all associated baths by ID.
   * @see {@link module:UserController.deleteOneUser} - This function uses the deleteOneUser controller.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @see {@link module:AuthJwt.isAdmin} - This function uses the isAdmin middleware.
   * @returns {Object} 200 - JSON response containing a success message.
   * @returns {Object} 400 - JSON response with an error message.
   * @security JWT
   * @example <caption>Example</caption>
   * app.delete(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOneUser
  );
    * @example <caption>Example response</caption>
    * { "message": "L'utilisateur et les baignades associés ont bien été supprimé !" }
   */
  app.delete(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOneUser
  );

  /**
   * @name POST /api/users/update-role/:id
   * @description Route to update a user's role by ID.
   * @see {@link module:UserController.updateUserRole} - This function uses the updateUserRole controller.
   * @see {@link module:AuthJwt.verifyToken} - This function uses the verifyToken middleware.
   * @see {@link module:AuthJwt.isAdmin} - This function uses the isAdmin middleware.
   * @returns {Object} 200 - JSON response containing a success message.
   * @returns {Object} 400 - JSON response with an error message.
   * @security JWT
   * @example <caption>Example</caption>
   * app.post(
    "/api/users/update-role/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUserRole
  );
    * @example <caption>Example response</caption>
    * { "message": "Le rôle de l'utilisateur a été mis à jour !" }
   */
  app.post(
    "/api/users/update-role/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUserRole
  );
};
