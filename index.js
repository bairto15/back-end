const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { app } = require("./http/express");
const { httpServer } = require("./http/http");
const { main } = require("./controllers/main");
const { getTodos, saveTodos, auth } = require("./controllers/todos");

app.use(bodyParser.json());
app.get("/", main);
app.post("/auth", auth);
app.post("/get_todos", getTodos);
app.post("/save_todos", saveTodos);

const PORT = 7000;

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => console.log("Mongoose запустился"));
httpServer.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`));
