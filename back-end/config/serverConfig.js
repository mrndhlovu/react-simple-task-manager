const cookieParser = require("cookie-parser");
const cors = require("cors");

const { ROOT_URL } = require("../utils/config");

const BUILD_DIR = "client/build";

const serverConfig = (app, express) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: ROOT_URL,
      credentials: true,
    })
  );

  app.use(express.static(BUILD_DIR));
};

module.exports = serverConfig;
