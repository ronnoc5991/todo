import type { ErrorRequestHandler } from "express";
import HttpStatusCode from "../types/HttpStatusCode.js";

const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.error(err); // TODO: find out how people keep these logs for debugging
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err.message);
};

export { errorHandler };
