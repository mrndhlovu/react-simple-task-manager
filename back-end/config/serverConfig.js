const cookieParser = require("cookie-parser");
const cors = require("cors");
const { BASE_URL } = require("../utils/config");

const BUILD_DIR = "../../front-end/build";

const serverConfig = (app, express) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());

  app.use(express.static(BUILD_DIR));
};

module.exports = serverConfig;
