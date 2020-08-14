const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { BASE_URL } = require("../utils/config");

const BUILD_DIR = "../../front-end/build";

const serverConfig = (app, express) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: BASE_URL,
      credentials: true,
    })
  );

  app.use(express.static(path.resolve(__dirname, BUILD_DIR)));
};

module.exports = serverConfig;
