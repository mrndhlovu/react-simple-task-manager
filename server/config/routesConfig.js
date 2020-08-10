const authRoutes = require("../routes/user/auth");

const routesConfig = (app) => {
  app.use("/v1/api/auth", authRoutes);
};

module.exports = routesConfig;
