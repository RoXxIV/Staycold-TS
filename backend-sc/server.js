/**
 * @module Server - Backend entry point
 * @description Backend entry point - Initializes the Express application and connects to the MongoDB database
 * @requires express - Express web framework for Node.js
 * @requires dotenv - Loads environment variables from a .env file into process.env
 * @requires cors - Middleware for enabling CORS with various options
 * @requires body-parser - Middleware for parsing incoming request bodies
 * @requires ./models
 * @requires express-rate-limit - Basic rate-limiting middleware for Express
 * @requires helmet - Helmet helps you secure your Express apps by setting various HTTP headers
 * @requires ./routes/auth.routes - Authentication routes
 * @requires ./routes/permissions.routes - Permissions routes
 * @requires ./routes/users.routes - Users routes
 * @requires ./routes/baths.routes - Baths routes
 * @requires ./routes/contact-form.routes - Contact form routes
 * @requires ./plugins/init-roles - Initializes roles in the database
 * @see {@link https://expressjs.com/|Express}
 * @see {@link https://www.npmjs.com/package/dotenv|dotenv}
 * @see {@link https://www.npmjs.com/package/cors|cors}
 * @see {@link https://www.npmjs.com/package/body-parser|body-parser}
 * @see {@link https://mongoosejs.com/|mongoose}
 * @see {@link https://www.npmjs.com/package/express-rate-limit|express-rate-limit}
 * @see {@link https://www.npmjs.com/package/helmet|helmet}
 */
// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const db = require("./models");
/**
 * @description Loads environment variables from a .env file into process.env
 */
dotenv.config();

/**
 * Initialize Express application
 * @type {express.Application}
 */
const app = express();

/**
 * @description Use Helmet for basic security.
 */
app.use(helmet());

/**
 * Rate-limiting configuration
 * @type {express-rate-limit}
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

/**
 * @description Apply rate-limiting to routes
 */
app.use("/api/", apiLimiter);

/**
 * @description Middleware for enabling CORS
 */
app.use(cors());

/**
 * @description Middleware for parsing incoming request bodies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    // Initialize roles after successful database connection
    require("./plugins/init-roles")();
  })
  .catch((error) => {
    console.log("Connection error", error);
    process.exit();
  });

/**
 * @description Root API endpoint
 * @route GET /
 */
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur StayCold API" });
});

/**
 * @description Import routes
 * @see {@link module:AuthRoutes} - Authentication routes
 * @see {@link module:UserRoutes} - User routes
 * @see {@link module:BathRoutes} - Bath routes
 * @see {@link module:ContactFormRoutes} - Contact form routes
 * @see {@link module:PermissionsRoutes} - Permissions routes
 */
require("./routes/auth.routes")(app);
require("./routes/permissions.routes")(app);
require("./routes/users.routes")(app);
require("./routes/baths.routes")(app);
require("./routes/contact-form.routes")(app);

/**
 * @description Server port
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
