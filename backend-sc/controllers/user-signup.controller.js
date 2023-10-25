/**
 * @module UserSignup
 * @description Controller for user signup.
 * @requires dotenv
 * @requires ../models
 * @requires jsonwebtoken
 * @requires bcryptjs
 * @requires ../plugins/nodemailer.config
 * @exports module:UserSignup.signup
 */
const dotenv = require("dotenv");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodemailer = require("../plugins/nodemailer.config");

const User = db.user;
const Role = db.role;

dotenv.config();

/**
 * User signup controller.
 * @description This function is called when the user clicks on the "Sign up" button.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws Will send a 500 status if an error occurs.
 */
exports.signup = async (req, res) => {
  try {
    // Generate unique confirmationCode for email verification
    const token = jwt
      .sign({ email: req.body.email }, process.env.JWT_KEY, {
        expiresIn: "24h",
      })
      .replace(/\./g, "0");

    // Create a new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      confirmationCode: token,
    });

    // Save the user to the database
    await user.save();

    // Role management
    if (req.body.roles) {
      const roles = await Role.find({
        name: { $in: req.body.roles },
      });

      // Add roles to the user
      user.roles = roles.map((role) => role._id);
      await user.save();

      // Send confirmation email
      nodemailer.sendActivationMail(
        user.username,
        user.email,
        user.confirmationCode
      );
      res.send({
        message:
          "L'utilisateur a été enregistré avec succès! merci de vérifier votre email",
      });
    } else {
      const role = await Role.findOne({ name: "user" });

      // Add 'user' role to the user
      user.roles = [role._id];
      await user.save();

      // Send confirmation email
      nodemailer.sendActivationMail(
        user.username,
        user.email,
        user.confirmationCode
      );
      res.send({
        message:
          "L'utilisateur a été enregistré avec succès! merci de vérifier votre email",
      });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
