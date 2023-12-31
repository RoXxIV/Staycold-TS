/**
 * @module dbConnection
 * @description Module for connecting to MongoDB database.
 * @requires dotenv
 * @requires ../models
 */
// Import dependencies
const dotenv = require("dotenv");

// Import database models
const db = require("../models");

// Load environment variables
dotenv.config();

/**
 * @function connectToMongoDB
 * @async
 * @description Connect to MongoDB database using Mongoose.
 * @returns {Promise} Resolves if successfully connected to MongoDB, otherwise rejects and logs the error.
 */
db.mongoose
  .connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((error) => {
    console.log("Connection error", error);
    process.exit();
  });
// console.log("Script terminé"); // debug line
