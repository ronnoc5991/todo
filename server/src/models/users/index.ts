import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../connection.js";

async function getUser(email: string) {
  const [results] = await connection.execute<Array<RowDataPacket>>(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );
  return results;
}

async function createUser(email: string, password: string) {
  const [results] = await connection.execute<ResultSetHeader>(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
  );
  return results;
}

export default { getUser, createUser };
