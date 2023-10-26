/**
 * @module JwtVerify
 * @description Middleware for JWT verification and permissions.
 * @requires jsonwebtoken
 * @requires dotenv
 * @requires ../models/index.js
 * @exports module:JwtVerify.verifyToken
 * @see {@link https://www.npmjs.com/package/jsonwebtoken|jsonwebtoken}
 */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../models");

const User = db.user;
const Role = db.role;

dotenv.config();

/**
 * Middleware to verify the presence of a token in the header.
 *
 * @async
 * @function
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
 * Middleware to verify if the user is an admin.
 *
 * @async
 * @function
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
 * Middleware to verify if the user is a moderator.
 *
 * @async
 * @function
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
