/** @requires module:express */
const express = require("express");

/** @requires module:dotEnv */
const dotenv = require("dotenv");

const db = require("./models");

dotenv.config();

const app = express();
/**
 * Connexion a la base de données
 */
db.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((error) => {
    console.log("Connection error", error);
    process.exit();
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
