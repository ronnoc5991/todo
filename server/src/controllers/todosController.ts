import db from "../models/index.js";
import type { Request } from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { Controller } from "./types.js";
import HttpStatusCode from "../types/HttpStatusCode.js";

const getTodoIdParam = (req: Request) => {
  if (!req.params.todoId) {
    return null;
  }

  const todoId = parseInt(req.params.todoId, 10);
  return Number.isInteger(todoId) ? todoId : null;
};

const createTodo: Controller = async (req, res, next) => {
  const { task } = req.body;
  const [result, error] = await tryCatch(db.todos.createTodo(task));

  if (error) {
    return next(error);
  }

  if (result.affectedRows === 0) {
    return next(new Error("Failed to create TODO"));
  }

  res.status(HttpStatusCode.CREATED).send();
};

const getAllTodos: Controller = async (_, res, next) => {
  const [allTodos, error] = await tryCatch(db.todos.getAllTodos());

  if (error) {
    return next(error);
  }

  res.status(HttpStatusCode.OK).send(allTodos);
};

const getTodoById: Controller = async (req, res, next) => {
  const todoId = getTodoIdParam(req);

  if (!todoId) {
    return next(new Error("Unable to parse TODO id."));
  }

  const [todos, error] = await tryCatch(db.todos.getTodo(todoId));

  if (error) {
    return next(error);
  }

  if (todos.length === 0) {
    res.status(HttpStatusCode.NOT_FOUND).send();
    return;
  }

  res.status(HttpStatusCode.OK).send(todos[0]);
};

const updateTodoById: Controller = async (req, res, next) => {
  const todoId = getTodoIdParam(req);

  if (!todoId) {
    return next(new Error("Unable to parse TODO id."));
  }

  const { task, isDone } = req.body;

  const [results, error] = await tryCatch(
    db.todos.updateTodo(todoId, task, isDone),
  );

  if (error) {
    return next(error);
  }

  if (results.affectedRows === 0) {
    res.status(HttpStatusCode.NOT_FOUND).send();
    return;
  }

  res.status(HttpStatusCode.NO_CONTENT).send();
};

const deleteTodoById: Controller = async (req, res, next) => {
  const todoId = getTodoIdParam(req);

  if (!todoId) {
    return next(new Error("Unable to parse TODO id."));
  }

  const [results, error] = await tryCatch(db.todos.deleteTodo(todoId));

  if (error) {
    return next(error);
  }

  if (results.affectedRows === 0) {
    res.status(HttpStatusCode.NOT_FOUND).send();
    return;
  }

  res.status(HttpStatusCode.NO_CONTENT).send();
};

export { getAllTodos, getTodoById, createTodo, updateTodoById, deleteTodoById };
