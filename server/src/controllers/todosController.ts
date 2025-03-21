import type { Request, RequestHandler } from "express";
import bodyParser from "body-parser";

import db from "../models/index.js";
import { tryCatch } from "../utils/tryCatch.js";
import HttpStatusCode from "../types/HttpStatusCode.js";

const jsonParser = bodyParser.json();

const getTodoIdParam = (req: Request) => {
  if (!req.params.todoId) {
    return null;
  }

  const todoId = parseInt(req.params.todoId, 10);
  return Number.isInteger(todoId) ? todoId : null;
};

const createTodo: Array<RequestHandler> = [
  jsonParser,
  async (req, res, next) => {
    const { task } = req.body;
    const [result, error] = await tryCatch(db.todos.createTodo(task));

    if (error) {
      return next(error);
    }

    if (result.affectedRows === 0) {
      return next(new Error("Failed to create TODO"));
    }

    res.status(HttpStatusCode.CREATED).send();
  },
];

const getAllTodos: RequestHandler = async (_, res, next) => {
  const [allTodos, error] = await tryCatch(db.todos.getAllTodos());

  if (error) {
    return next(error);
  }

  res.status(HttpStatusCode.OK).send(allTodos);
};

const getTodoById: RequestHandler = async (req, res, next) => {
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

const updateTodoById: Array<RequestHandler> = [
  jsonParser,
  async (req, res, next) => {
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
  },
];

const deleteTodoById: RequestHandler = async (req, res, next) => {
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

export default {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
};
