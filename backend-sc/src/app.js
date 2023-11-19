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
 * @requires ./api/routes/auth.routes - Authentication routes
 * @requires ./api/routes/permissions.routes - Permissions routes
 * @requires ./api/routes/users.routes - Users routes
 * @requires ./api/routes/baths.routes - Baths routes
 * @requires ./api/routes/contact-form.routes - Contact form routes
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

// Import database models
const db = require("./models");

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Use Helmet for basic security.
app.use(helmet());

// Rate-limiting configuration for API routes and apply rate-limiting to routes starting with /api/
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use("/api/", apiLimiter);

// Middleware for enabling CORS
app.use(cors());

// Middleware for parsing incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @description Connect to MongoDB database
 * @returns {Promise} Resolves if successfully connected to MongoDB, otherwise rejects and logs the error.
 */
db.mongoose
  .connect(process.env.MONGO_URI, {
    // MONGO_URI_TEST || MONGO_URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    // Initialize roles after successful database connection - Uncomment to initialize roles
    // require("./plugins/init-roles")();
  })
  .catch((error) => {
    console.log("Connection error", error);
    process.exit();
  });

// Root API endpoint - GET /
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
require("./api/routes/auth.routes")(app);
require("./api/routes/permissions.routes")(app);
require("./api/routes/users.routes")(app);
require("./api/routes/baths.routes")(app);
require("./api/routes/contact-form.routes")(app);

// Set server port, use environment variable if available
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Export Express application
module.exports = app;
