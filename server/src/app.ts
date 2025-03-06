import express from "express";
import todosController from "./controllers/todos.js";

const app = express();
const port = 3000;

app.use("/todos", todosController);

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.post("/", (_, res) => {
  res.send("Got a POST request");
});

app.put("/", (_, res) => {
  res.send("Got a PUT request");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
