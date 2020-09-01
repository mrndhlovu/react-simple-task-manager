const log = require("./utils/console-alert");
const app = require("./config/index.js");

const { PORT = 5000 } = process.env;

app.listen(PORT, () => log.success(`Server listening on port ${PORT}`));
process.on("exit", () => log.warning("Server shutdown."));
