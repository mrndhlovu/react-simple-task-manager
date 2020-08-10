const express = require("express");
const http = require("http");

const { PORT } = require("./utils/config");
const log = require("./utils/console-alert");
const mongooseDBConfig = require("./config/mongooseDBConfig");
const routesConfig = require("./config/routesConfig");
const serverConfig = require("./config/serverConfig");

mongooseDBConfig();

const app = express();
const server = http.createServer(app);

serverConfig(app, express);

routesConfig(app, express);
server.listen(PORT, () => log.success(`Server listening on port ${PORT}`));
process.on("exit", () => log.warning("Server shutdown."));
