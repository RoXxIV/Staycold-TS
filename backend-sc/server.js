/**
 * @module Server
 * @requires express
 * @requires dotenv
 * @requires cors
 * @requires body-parser
 * @requires ./models
 * @requires express-rate-limit
 * @requires helmet
 */
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

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
 * Use Helmet for basic security
 */
app.use(helmet());

/**
 * Rate-limiting configuration
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

/**
 * Apply rate-limiting to routes
 */
app.use("/api/", apiLimiter);

/**
 * Middleware for enabling CORS
 */
app.use(cors());

/**
 * Middleware for parsing incoming request bodies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
 * Root API endpoint
 */
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur StayCold API" });
});

/**
 * Import authentication routes
 */
require("./routes/auth.routes")(app);
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
