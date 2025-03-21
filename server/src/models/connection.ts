import mysql from "mysql2/promise";

// TODO: switch to 'pool'
const connection = await mysql.createConnection({
  host: process.env.DB_HOST ?? "",
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "",
});

export default connection;
