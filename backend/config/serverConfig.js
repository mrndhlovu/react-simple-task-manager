const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const timeout = require("connect-timeout");

const BUILD_DIR = path.join(__dirname, "../../frontend/build");

var CORS_OPTIONS = {
  credentials: true,
  origin: (origin, callback) => callback(null, true),
  optionsSuccessStatus: 200,
};

const serverConfig = (app, express) => {
  app.use(timeout("60s"));
  app.use(cors(CORS_OPTIONS));
  app.use(cookieParser());

  app.use(express.static(BUILD_DIR));
  // app.get("*", (req, res) => {
  //   res.sendFile(`${BUILD_DIR}/index.html`);
  // });
};

module.exports = serverConfig;
