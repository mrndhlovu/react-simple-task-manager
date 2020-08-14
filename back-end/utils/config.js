const dotenv = require("dotenv");

dotenv.config();

const environment = process.env.DEVELOPMENT ? "development" : "production";
const isDevelopment = environment === "development";
const S_GRID_API_KEY = process.env.SEND_GRID_API_KEY;

const CONNECTION_URI = process.env.MONGODB_URI;
const { LOCAL_MONGO_DB } = process.env;
const PORT = process.env.PORT || 5000;

const { PRIVATE_SIGNATURE, PUBLIC_SIGNATURE } = process.env;
const ROOT_URL = isDevelopment
  ? "http://localhost:3000"
  : `https://ec2-3-248-208-68.eu-west-1.compute.amazonaws.com:${PORT}`;

const ALLOWED_UPDATE_FIELDS_USER = [
  "firstName",
  "lastName",
  "email",
  "password",
];
const ALLOWED_UPDATE_TASK_FIELDS = ["title", "dueDate", "status", "archived"];
const ALLOWED_UPDATE_LIST_FIELDS = ["title"];

module.exports = {
  ALLOWED_UPDATE_FIELDS_USER,
  ALLOWED_UPDATE_TASK_FIELDS,
  ALLOWED_UPDATE_LIST_FIELDS,
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
