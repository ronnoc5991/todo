import express from "express";
import todosRouter from "./routes/todosRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
