const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const serverConfig = (app, express) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: (origin, callback) => callback(null, true),
      credentials: true,
    })
  );

  app.use(express.static(path.join(__dirname, "/../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  });
};

module.exports = serverConfig;
