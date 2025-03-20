import express from "express";
import todosRouter from "./routes/todosRouter.js";
import { errorHandler } from "./errors/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/todos", todosRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
