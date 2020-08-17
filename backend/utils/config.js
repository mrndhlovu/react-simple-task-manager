const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

const S_GRID_API_KEY = process.env.SEND_GRID_API_KEY;
const CONNECTION_URI = process.env.MONGODB_URI;

const { PRIVATE_SIGNATURE, PUBLIC_SIGNATURE, LOCAL_MONGO_DB } = process.env;

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
  LOCAL_MONGO_DB,
  PORT,
  PRIVATE_SIGNATURE,
  PUBLIC_SIGNATURE,
  S_GRID_API_KEY,
};
