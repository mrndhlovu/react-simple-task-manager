const cookieParser = require("cookie-parser");
const cors = require("cors");

const BUILD_DIR = "../../frontend/build";

const serverConfig = (app, express) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: (origin, callback) => callback(null, true),
      credentials: true,
    })
  );

  app.use(express.static(BUILD_DIR));
};

module.exports = serverConfig;
