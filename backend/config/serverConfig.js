const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const express = require("express");

const CORS_OPTIONS = {
  credentials: true,
  origin: (origin, callback) => callback(null, true),
  optionsSuccessStatus: 200,
};

const BUILD_DIR = path.join(__dirname, "../../frontend/build");

const serverConfig = (app) => {
  app.use(cors(CORS_OPTIONS));
  app.use(cookieParser());

  app.use(express.static(BUILD_DIR));
  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(BUILD_DIR, "index.html"));
  // });
};

module.exports = serverConfig;
