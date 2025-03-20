import express from "express";
import bodyParser from "body-parser";
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  updateTodoById,
} from "../controllers/todos.js";

const todosRouter = express.Router();

const jsonParser = bodyParser.json();

todosRouter.get("/", getAllTodos);

todosRouter.get("/:todoId", getTodoById);

todosRouter.post("/", jsonParser, createTodo);

todosRouter.put("/:todoId", jsonParser, updateTodoById);

todosRouter.delete("/:todoId", deleteTodoById);

export default todosRouter;
