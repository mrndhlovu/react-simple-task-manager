const cookieParser = require("cookie-parser");
const cors = require("cors");

const { ROOT_URL } = require("../utils/config");

const BUILD_DIR = "../../front-end/build";

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
