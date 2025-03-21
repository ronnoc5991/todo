import express from "express";
import usersController from "../controllers/usersController.js";
import bodyParser from "body-parser";

const usersRouter = express.Router();

const jsonParser = bodyParser.json();

usersRouter.post("/sign-up", jsonParser, usersController.createNewUser);

usersRouter.post("/log-in", jsonParser, usersController.logIn);

// define the log out...
// define the delete user...
// extra credit: define update password...

export default usersRouter;
