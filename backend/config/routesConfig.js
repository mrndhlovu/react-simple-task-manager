const authRoutes = require("../routes/user/auth");
const taskRoutes = require("../routes/user/tasks");
const errorHandler = require("./errorHandler");

const API_VERSION = 1;
const API_SUFFIX = `/v${API_VERSION}/api`;

const routesConfig = (app) => {
  app.use(`${API_SUFFIX}/auth`, authRoutes);
  app.use(`${API_SUFFIX}/tasks`, taskRoutes);

  app.use(errorHandler);
};

module.exports = routesConfig;
