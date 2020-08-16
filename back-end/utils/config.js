const dotenv = require("dotenv");

dotenv.config();

const isDevelopment = process.env.DEVELOPMENT === "development";

const S_GRID_API_KEY = process.env.SEND_GRID_API_KEY;
const CONNECTION_URI = process.env.MONGODB_URI;
const { LOCAL_MONGO_DB } = process.env;

const PORT = process.env.PORT || 5000;

const { PRIVATE_SIGNATURE, PUBLIC_SIGNATURE } = process.env;
const BASE_URL = isDevelopment
  ? "http://localhost:3000"
  : `http://ec2-3-248-208-68.eu-west-1.compute.amazonaws.com:5000`;

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
  ALLOWED_UPDATE_LIST_FIELDS,
  ALLOWED_UPDATE_TASK_FIELDS,
  CONNECTION_URI,
  isDevelopment,
  LOCAL_MONGO_DB,
  PORT,
  PRIVATE_SIGNATURE,
  PUBLIC_SIGNATURE,
  BASE_URL,
  S_GRID_API_KEY,
};
