/**
 * @module UserSignin
 * @description Controller for user signin.
 * @requires dotenv
 * @requires ../models
 * @requires jsonwebtoken
 * @requires bcryptjs
 * @exports module:UserSignin.signin
 */

const dotenv = require("dotenv");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = db.user;

dotenv.config();

/**
 * User signin controller.
 * @description This function is called when the user clicks on the "Sign in" button.
 * @async
 * @function
 * @param {Object} req - Express request object containing the username and password.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing user details and access token.
 * @throws {Object} JSON response with a 500 status if an internal server error occurs.
 * @throws {Object} JSON response with a 404 status if the user is not found.
 * @throws {Object} JSON response with a 401 status if the password is incorrect.
 * @throws {Object} JSON response with a 403 status if the account is not active.
 */
exports.signin = async (req, res) => {
  try {
    // Find the user by username and populate roles
    const user = await User.findOne({ username: req.body.username })
      .populate("roles", "-__v")
      .exec();

    // Check if user exists
    if (!user) {
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }

    // Validate password
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    // Check if password is valid
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Mot de passe incorrect!",
      });
    }

    // Check if account is active
    if (user.status !== "Active") {
      return res.status(403).send({
        message: "Veuillez vérifier votre email pour activer votre compte!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: 86400, // 24 hours
    });

    // Map roles to authorities
    const authorities = user.roles.map(
      (role) => `ROLE_${role.name.toUpperCase()}`
    );

    // Send response
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
      createdAt: user.createdAt,
    });
  } catch (err) {
    // Log the error and send a 500 status code
    console.error(err);
    res.status(500).send({ message: err });
  }
};
