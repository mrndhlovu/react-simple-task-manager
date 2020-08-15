const cookieParser = require("cookie-parser");
const cors = require("cors");
const { BASE_URL } = require("../utils/config");
const path = require("path");

const serverConfig = (app, express) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: BASE_URL,
      credentials: true,
    })
  );
  app.use(express.static(path.join(__dirname, "front-end/build")));
};

module.exports = serverConfig;
