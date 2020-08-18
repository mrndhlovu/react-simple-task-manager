const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const timeout = require("connect-timeout");

const BUILD_DIR = path.join(__dirname, "../../frontend/build");
isProd = process.env.PRODUCTION;

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

  if (isProd) {
    app.get("*", (req, res) => {
      res.sendFile(`${BUILD_DIR}/index.html`);
    });
  }
};

module.exports = serverConfig;
