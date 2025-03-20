import db from "../database/index.js";
import type { Request, Response } from "express";

type Controller = (req: Request, res: Response) => void;

const createTodo: Controller = async (req, res) => {
  const { task } = req.body;
  try {
    const result = await db.createTodo(task);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};

const getAllTodos: Controller = async (_, res) => {
  try {
    const allTodos = await db.getAllTodos();
    res.send(allTodos);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};

const getTodoById: Controller = async (req, res) => {
  if (!req.params.todoId) {
    res.send(500);
    return;
  }

  const todoId = parseInt(req.params.todoId, 10);

  try {
    const result = await db.getTodo(todoId);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};

const updateTodoById: Controller = async (req, res) => {
  if (!req.params.todoId) {
    res.send(500);
    return;
  }

  const todoId = parseInt(req.params.todoId, 10);
  const { task, isDone } = req.body;

  try {
    const result = await db.updateTodo(todoId, task, isDone);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};

const deleteTodoById: Controller = async (req, res) => {
  if (!req.params.todoId) {
    res.send(500);
    return;
  }

  const todoId = parseInt(req.params.todoId, 10);

  try {
    const result = await db.deleteTodo(todoId);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};

export { getAllTodos, getTodoById, createTodo, updateTodoById, deleteTodoById };
