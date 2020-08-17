const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const timeout = require("connect-timeout");

const BUILD_DIR = "/frontend/build";

const serverConfig = (app, express) => {
  app.use(timeout("60s"));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: (origin, callback) => callback(null, true),
      credentials: true,
    })
  );

  app.use(express.static(BUILD_DIR));
  app.get("*", (req, res) => {
    res.sendFile(path.join(`${BUILD_DIR}/index.html`));
  });
};

module.exports = serverConfig;
