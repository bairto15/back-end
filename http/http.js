const { createServer } = require("http");
const { app } = require("./express");

module.exports.httpServer = createServer(app);