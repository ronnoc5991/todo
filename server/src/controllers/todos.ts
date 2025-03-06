import express from "express";
import bodyParser from "body-parser";

const todosController = express.Router();

const jsonParser = bodyParser.json();

// storing locally for now
const database: Record<string, Todo> = {};

type Todo = {
  id: string;
  isCompleted: boolean;
  description: string;
};

function storeInDatabase(todo: Todo) {
  database[todo.id] = todo;
  console.log(database);
}

function getTodoFromDatabase(id: string) {
  return database[id];
}

function deleteFromDatabase(id: string) {
  delete database[id];
}

const generateUniqueId = (() => {
  let id = 0;

  return () => {
    id++;
    return `${id}`;
  };
})();

todosController.get("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const todo = getTodoFromDatabase(todoId);

  if (!todo) {
    res.send(`Unable to find todo with id: ${todoId}`);
  } else {
    res.send(JSON.stringify(todo));
  }
});

todosController.post("/", jsonParser, (req, res) => {
  const uniqueId = generateUniqueId();
  const { isCompleted, description } = req.body;
  const todo = {
    id: uniqueId,
    isCompleted,
    description,
  };

  storeInDatabase(todo);

  res.send(`Success: ${uniqueId}`);
});

todosController.put("/:todoId", jsonParser, (req, res) => {
  const { todoId } = req.params;
  const todo = getTodoFromDatabase(todoId);

  if (!todo) {
    res.send(`Unable to update todo with id: ${todoId}.  It does not exist.`);
  } else {
    const { isCompleted, description } = req.body;
    const updatedTodo = {
      id: todoId,
      isCompleted,
      description,
    };
    storeInDatabase(updatedTodo);
    res.send("Updated todo");
  }
});

todosController.delete("/:todoId", (req, res) => {
  const { todoId } = req.params;

  deleteFromDatabase(todoId);
  res.send("Success");
});

export default todosController;
