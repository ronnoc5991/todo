import express from "express";

import healthController from "../controllers/healthController.js";

const healthRouter = express.Router();

healthRouter.get("/", healthController.check);

export default healthRouter;
