import express from "express";
import bodyParser from "body-parser";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../database/todos/index.js";

const todosController = express.Router();

const jsonParser = bodyParser.json();

todosController.post("/", jsonParser, async (req, res) => {
  const { task } = req.body;
  try {
    const result = await createTodo(task);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
});

todosController.get("/", async (_, res) => {
  try {
    const allTodos = await getAllTodos();
    res.send(allTodos);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
});

todosController.get("/:todoId", async (req, res) => {
  const todoId = parseInt(req.params.todoId, 10);

  try {
    const result = await getTodo(todoId);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
});

todosController.put("/:todoId", jsonParser, async (req, res) => {
  const todoId = parseInt(req.params.todoId, 10);
  const { task, isDone } = req.body;

  try {
    const result = await updateTodo(todoId, task, isDone);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
});

todosController.delete("/:todoId", async (req, res) => {
  const todoId = parseInt(req.params.todoId, 10);

  try {
    const result = await deleteTodo(todoId);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
});

export default todosController;
