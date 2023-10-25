/**
 * @module JwtVerify
 * @description Middleware for JWT verification.
 * @requires jsonwebtoken
 * @requires dotenv
 * @exports module:JwtVerify.verifyToken
 * @see {@link https://www.npmjs.com/package/jsonwebtoken|jsonwebtoken}
 */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Middleware to verify the presence of a JWT token in the request header.
 * @description This function is called before accessing a protected route.
 * @function
 * @param {Object} req - Express request object containing the authorization header.
 * @param {Object} res - Express response object.
 * @param {function} next - Next Express middleware function.
 * @returns {void}
 * @throws {Object} JSON response with a 403 status if no token is provided.
 * @throws {Object} JSON response with a 403 status if the token format is invalid.
 * @throws {Object} JSON response with a 401 status if the token is invalid.
 */
jwt.verifyToken = (req, res, next) => {
  // Retrieve the authorization header
  const authHeader = req.headers["authorization"];

  // Check if the authorization header exists
  if (!authHeader) {
    return res.status(403).send({ message: "Aucun token fourni!" });
  }

  const tokenParts = authHeader.split(" ");
  // Validate the token format
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(403).send({ message: "Format du token invalide!" });
  }

  const token = tokenParts[1];
  // Verify the token
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Non autorisé!" });
    }
    // Attach the decoded user ID to the request object
    req.userId = decoded.id;
    next();
  });
};
