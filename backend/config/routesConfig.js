const express = require("express");
const authRoutes = require("../routes/user/auth");
const taskRoutes = require("../routes/tasks/tasks");
const errorHandler = require("./errorHandler");

const API_SUFFIX = "/v1/api";

const routesConfig = (app) => {
  app.use(express.json());
  app.use(`${API_SUFFIX}/auth`, authRoutes);
  app.use(`${API_SUFFIX}/tasks`, taskRoutes);

  app.use(errorHandler);
};

module.exports = routesConfig;
