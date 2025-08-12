import { RequestHandler } from "express";

// TODO: ensure connection to db before returning 'OK'
const check: RequestHandler = async (_, res) => {
  res.status(200).send("OK");
};

export default { check };
