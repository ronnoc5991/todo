import connection from "../connection.js";

async function createTodo(task: string) {
  const [results] = await connection.execute(
    "INSERT INTO todos (task, is_done) VALUES (?, 0)",
    [task],
  );
  return results;
}

async function getAllTodos() {
  const [results] = await connection.execute("SELECT * FROM todos");
  return results;
}

async function getTodo(id: number) {
  const [results] = await connection.execute(
    "SELECT * FROM todos WHERE id = ?",
    [id],
  );
  return results;
}

async function updateTodo(id: number, task: string, isDone: boolean) {
  const [results] = await connection.execute(
    "UPDATE todos SET task = ?, is_done = ? WHERE id = ?",
    [task, isDone ? 1 : 0, id],
  );
  return results;
}

async function deleteTodo(id: number) {
  const [results] = await connection.execute("DELETE FROM todos WHERE id = ?", [
    id,
  ]);
  return results;
}

export { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
