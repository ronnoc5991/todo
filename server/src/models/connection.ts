import mysql from "mysql2/promise";

const DATABASE_NAME = "todo_app";

// TODO: switch to 'pool'
const connection = await mysql.createConnection({
  host: process.env.DB_HOST ?? "",
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PASSWORD ?? "",
});

await connection.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

export default connection;
