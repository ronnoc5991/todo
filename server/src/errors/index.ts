import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.error(err);
  res.status(500).send(err.message);
};

export { errorHandler };
