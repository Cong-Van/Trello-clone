const boardRouter = require("./boards");
const columnRouter = require("./columns");
const cardRouter = require("./cards");

function route(app) {
  // Board APIs
  app.use("/boards", boardRouter);
  // Column APIs
  app.use("/columns", columnRouter);
  // Card APIs
  app.use("/cards", cardRouter);
}

module.exports = route;
