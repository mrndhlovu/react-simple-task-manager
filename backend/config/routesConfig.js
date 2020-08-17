const authRoutes = require("../routes/user/auth");
const taskRoutes = require("../routes/user/tasks");
const errorHandler = require("./errorHandler");

const routesConfig = (app) => {
  app.use("/v1/api/auth", authRoutes);
  app.use("/v1/api/tasks", taskRoutes);

  app.use(errorHandler);
};

module.exports = routesConfig;
