import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../connection.js";

export const USERS_TABLE_CREATION_QUERY = `CREATE TABLE IF NOT EXISTS users (\
id INT AUTO_INCREMENT PRIMARY KEY,\
email VARCHAR(320) NOT NULL,\
hashed_password CHAR(60) NOT NULL\
)`;

async function createUser(email: string, hashedPassword: string) {
  const [results] = await connection.execute<ResultSetHeader>(
    "INSERT INTO users (email, hashed_password) VALUES (?, ?)",
    [email, hashedPassword],
  );
  return results;
}

async function getUser(email: string) {
  const [results] = await connection.execute<Array<RowDataPacket>>(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );
  return results;
}

export default { getUser, createUser };
