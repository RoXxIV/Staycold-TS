const dotenv = require("dotenv");
const db = require("../models");

// Load environment variables from a .env file into process.env
dotenv.config();

/**
 * @description Connect to MongoDB database
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
  })
  .catch((error) => {
    console.log("Connection error", error);
    process.exit();
  });
console.log("Script terminé");
