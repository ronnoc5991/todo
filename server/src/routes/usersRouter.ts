import express from "express";

import usersController from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.post("/sign-up", usersController.createNewUser);

usersRouter.post("/log-in", usersController.logIn);

// define the log out...
// define the delete user...
// extra credit: define update password...

export default usersRouter;
