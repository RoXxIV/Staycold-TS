/**
 * @fileoverview Middleware for JWT verification and permissions.
 * @module AuthJwt
 * @description This module handles JWT verification and role-based permissions.
 * @see {@link https://www.npmjs.com/package/jsonwebtoken|jsonwebtoken}
 * @see {@link https://www.npmjs.com/package/dotenv|dotenv}
 * @requires jsonwebtoken - Used to verify the JWT token.
 * @requires dotenv - Used to load environment variables.
 * @requires ../../models/index.js - Sequelize database models.
 * @exports module:AuthJwt
 */

// import dependencies
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// import database models
const db = require("../../models");

const User = db.user;
const Role = db.role;

// load environment variables
dotenv.config();

/**
 * @function verifyToken
 * @async
 * @description Middleware to verify the presence of a token in the header.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {Object} JSON response with a 403 status if no token is provided or if the token format is incorrect.
 * @throws {Object} JSON response with a 401 status if the token is invalid.
 * @example <caption>Example usage of verifyToken middleware.</caption>
 * // Route definition in another file
 * app.get("/api/test", [authJwt.verifyToken], controller.test);
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check if the token is present
    if (!authHeader) {
      return res.status(403).send({ message: "Aucun token fourni!" });
    }

    const tokenParts = authHeader.split(" ");

    // Check if the token has the correct format
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(403).send({ message: "Format du token invalide!" });
    }

    const token = tokenParts[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Non autorisé!" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

/**
 * @function isAdmin
 * @async
 * @description Middleware to verify if the user is an admin.
 * @see {@link module:User} - User model from the database.
 * @see {@link module:Role} - Role model from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {Object} JSON response with a 500 status if an error occurs.
 * @throws {Object} JSON response with a 403 status if the user is not an admin.
 * @example <caption>Example usage of isAdmin middleware.</caption>
 * // Route definition in another file
 * app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
 */
const isAdmin = async (req, res, next) => {
  try {
    // Find the user in the database
    const user = await User.findById(req.userId).exec();
    // Find the roles associated with the user
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    // Check if the user has the admin role
    if (roles.some((role) => role.name === "admin")) {
      next();
    } else {
      res.status(403).send({ message: "Admin role required!" });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

/**
 * @function isModerator
 * @async
 * @description Middleware to verify if the user is a moderator.
 * @see {@link module:User} - User model from the database.
 * @see {@link module:Role} - Role model from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {Object} JSON response with a 500 status if an error occurs.
 * @throws {Object} JSON response with a 403 status if the user is not a moderator.
 * @example <caption>Example usage of isModerator middleware.</caption>
 * // Route definition in another file
 * app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
 */
const isModerator = async (req, res, next) => {
  try {
    // Find the user in the database
    const user = await User.findById(req.userId).exec();
    // Find the roles associated with the user
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    // Check if the user has the moderator role or the admin role
    if (
      roles.some((role) => role.name === "moderator" || role.name === "admin")
    ) {
      next();
    } else {
      res.status(403).send({ message: "Moderator role required!" });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

// export the middleware functions
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
// export the module
module.exports = authJwt;
