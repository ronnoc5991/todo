import db from "../database/index.js";
import type { Request, Response, NextFunction } from "express";
import { tryCatch } from "../utils/tryCatch.js";

type Controller = (req: Request, res: Response, next: NextFunction) => void;

const getTodoIdParam = (req: Request) => {
  if (!req.params.todoId) {
    return null;
  }

  const todoId = parseInt(req.params.todoId, 10);
  return Number.isInteger(todoId) ? todoId : null;
};

const createTodo: Controller = async (req, res, next) => {
  const { task } = req.body;
  const [result, error] = await tryCatch(db.createTodo(task));

  if (error) {
    return next(error);
  }

  if (result.affectedRows === 0) {
    return next(new Error("Failed to create TODO"));
  }

  res.status(201).send();
};

const getAllTodos: Controller = async (_, res, next) => {
  const [allTodos, error] = await tryCatch(db.getAllTodos());

  if (error) {
    return next(error);
  }

  res.send(allTodos);
};

const getTodoById: Controller = async (req, res, next) => {
  const todoId = getTodoIdParam(req);

  if (!todoId) {
    return next(new Error("Unable to parse TODO id."));
  }

  const [todos, error] = await tryCatch(db.getTodo(todoId));

  if (error) {
    return next(error);
  }

  if (todos.length === 0) {
    res.status(404).send();
    return;
  }

  res.send(todos[0]);
};

const updateTodoById: Controller = async (req, res, next) => {
  const todoId = getTodoIdParam(req);

  if (!todoId) {
    return next(new Error("Unable to parse TODO id."));
  }

  const { task, isDone } = req.body;

  const [results, error] = await tryCatch(db.updateTodo(todoId, task, isDone));

  if (error) {
    return next(error);
  }

  if (results.affectedRows === 0) {
    res.status(404).send();
    return;
  }

  res.status(204).send();
};

const deleteTodoById: Controller = async (req, res, next) => {
  const todoId = getTodoIdParam(req);

  if (!todoId) {
    return next(new Error("Unable to parse TODO id."));
  }

  const [results, error] = await tryCatch(db.deleteTodo(todoId));

  if (error) {
    return next(error);
  }

  if (results.affectedRows === 0) {
    res.status(404).send();
    return;
  }

  res.status(204).send();
};

export { getAllTodos, getTodoById, createTodo, updateTodoById, deleteTodoById };
