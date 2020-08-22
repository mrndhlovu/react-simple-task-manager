const cookieParser = require("cookie-parser");
const cors = require("cors");

var CORS_OPTIONS = {
  credentials: true,
  origin: (origin, callback) => callback(null, true),
  optionsSuccessStatus: 200,
};

const serverConfig = (app) => {
  app.use(cors(CORS_OPTIONS));
  app.use(cookieParser());
};

module.exports = serverConfig;
