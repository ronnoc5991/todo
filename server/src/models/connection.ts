import mysql from "mysql2/promise";
import { USERS_TABLE_CREATION_QUERY } from "./users/index.js";

const DATABASE_NAME = "todo_app";

// TODO: switch to 'pool'
const connection = await mysql.createConnection({
  host: process.env.DB_HOST ?? "",
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PASSWORD ?? "",
});

async function initialize() {
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

  await connection.query(`USE ${DATABASE_NAME}`);

  await connection.query(USERS_TABLE_CREATION_QUERY);
}

await initialize();
// TODO: add rest of 'initialization' queries here

export default connection;
