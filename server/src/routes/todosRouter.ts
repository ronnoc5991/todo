import express from "express";

import todosController from "../controllers/todosController.js";

const todosRouter = express.Router();

todosRouter.get("/", todosController.getAllTodos);

todosRouter.get("/:todoId", todosController.getTodoById);

todosRouter.post("/", todosController.createTodo);

todosRouter.put("/:todoId", todosController.updateTodoById);

todosRouter.delete("/:todoId", todosController.deleteTodoById);

export default todosRouter;
