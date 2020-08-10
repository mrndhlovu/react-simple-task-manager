const dotenv = require("dotenv");

dotenv.config();

const environment = process.env.DEVELOPMENT ? "development" : "production";
const isDevelopment = environment === "development";
const S_GRID_API_KEY = process.env.SEND_GRID_API_KEY;

const CONNECTION_URI = process.env.MONGODB_URI;
const { LOCAL_MONGO_DB } = process.env;
const PORT = process.env.PORT || 5000;

const { PRIVATE_SIGNATURE, PUBLIC_SIGNATURE } = process.env;
const ROOT_URL =
  process.env.LOCAL_URL || `https://moneat.herokuapp.com:${PORT}`;

const ALLOWED_UPDATE_FIELDS_USER = ["name", "email", "password"];

module.exports = {
  ALLOWED_UPDATE_FIELDS_USER,
  environment,
  ROOT_URL,
  CONNECTION_URI,
  LOCAL_MONGO_DB,
  PORT,
  S_GRID_API_KEY,
  PUBLIC_SIGNATURE,
  PRIVATE_SIGNATURE,
  isDevelopment,
};
