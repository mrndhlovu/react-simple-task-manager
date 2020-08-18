const cookieParser = require("cookie-parser");
const cors = require("cors");
const timeout = require("connect-timeout");

var CORS_OPTIONS = {
  credentials: true,
  origin: (origin, callback) => callback(null, true),
  optionsSuccessStatus: 200,
};

const serverConfig = (app, express) => {
  app.use(timeout("60s"));
  app.use(cors(CORS_OPTIONS));
  app.use(cookieParser());
};

module.exports = serverConfig;
