const express = require("express");

const mongooseDBConfig = require("./mongooseDBConfig");
const routesConfig = require("./routesConfig");
const serverConfig = require("./serverConfig");

const app = express();

mongooseDBConfig();
serverConfig(app, express);
routesConfig(app, express);

module.exports = app;
