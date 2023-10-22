/**
 * @module Server
 * @requires express
 * @requires dotenv
 * @requires ./models
 */
const express = require("express");
const dotenv = require("dotenv");
const db = require("./models");

/**
 * Load environment variables from .env file
 */
dotenv.config();

/**
 * Initialize Express application
 * @type {express.Application}
 */
const app = express();

/**
 * Connect to MongoDB database
 *
 * @function
 * @async
 * @returns {Promise} Resolves if successfully connected to MongoDB, otherwise rejects and logs the error.
 */
db.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    // Initialize roles after successful database connection
    require("./plugins/init-roles")();
  })
  .catch((error) => {
    console.log("Connection error", error);
    process.exit();
  });

/**
 * Server port
 * @type {number}
 */
const PORT = process.env.PORT || 5000;

/**
 * Start the Express server
 *
 * @function
 * @param {number} PORT - The port number on which the server will listen.
 * @param {function} callback - A callback function to execute when the server starts.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
