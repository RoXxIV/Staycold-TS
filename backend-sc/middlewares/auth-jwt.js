/**
 * @fileoverview Middleware for JWT verification and permissions.
 * @module AuthJwt
 * @namespace AuthJwt
 * @description This module handles JWT verification and role-based permissions.
 * @requires jsonwebtoken - Used to verify the JWT token.
 * @requires dotenv - Used to load environment variables.
 * @requires ../models/index.js - Sequelize database models.
 * @exports verifyToken - Middleware to verify the presence of a token in the header.
 * @exports isAdmin - Middleware to verify if the user is an admin.
 * @exports isModerator - Middleware to verify if the user is a moderator.
 * @see {@link https://www.npmjs.com/package/jsonwebtoken|jsonwebtoken}
 * @see {@link https://www.npmjs.com/package/dotenv|dotenv}
 */

// import dependencies
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

/**
 * @typedef {import('../models').User} User
 * @typedef {import('../models').Role} Role
 */
const db = require("../models");

/**
 * User model from the database.
 * @type {User}
 */
const User = db.user;
/**
 * Role model from the database.
 * @type {Role}
 */
const Role = db.role;

/**
 * @description Loads environment variables from a .env file into process.env
 */
dotenv.config();

/**
 * @function verifyToken
 * @async
 * @description Middleware to verify the presence of a token in the header.
 * @memberof AuthJwt
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {Object} JSON response with a 403 status if no token is provided or if the token format is incorrect.
 * @throws {Object} JSON response with a 401 status if the token is invalid.
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(403).send({ message: "Aucun token fourni!" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(403).send({ message: "Format du token invalide!" });
    }

    const token = tokenParts[1];
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
 * @memberof AuthJwt
 * @see {@link module:User} - User model from the database.
 * @see {@link module:Role} - Role model from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {Object} JSON response with a 500 status if an error occurs.
 * @throws {Object} JSON response with a 403 status if the user is not an admin.
 */
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

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
 *
 * @function isModerator
 * @async
 * @description Middleware to verify if the user is a moderator.
 * @memberof AuthJwt
 * @see {@link module:User} - User model from the database.
 * @see {@link module:Role} - Role model from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {Object} JSON response with a 500 status if an error occurs.
 * @throws {Object} JSON response with a 403 status if the user is not a moderator.
 */
const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

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

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

module.exports = authJwt;
