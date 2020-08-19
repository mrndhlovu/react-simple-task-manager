const express = require("express");
const path = require("path");

const authRoutes = require("../routes/user/auth");
const taskRoutes = require("../routes/tasks/tasks");
const errorHandler = require("./errorHandler");

const API_SUFFIX = "/api";
const BUILD_DIR = path.join(__dirname, "../../frontend/build");

const routesConfig = (app) => {
  app.use(express.json());
  app.use(`${API_SUFFIX}/auth`, authRoutes);
  app.use(`${API_SUFFIX}/tasks`, taskRoutes);

  app.use(errorHandler);
  app.use(express.static(BUILD_DIR));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(BUILD_DIR, "index.html"));
  });
};

module.exports = routesConfig;
