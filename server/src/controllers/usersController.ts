import { RequestHandler, Response } from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import db from "../models/index.js";
import { tryCatch } from "../utils/tryCatch.js";
import HttpStatusCode from "../types/HttpStatusCode.js";

// log out
// delete user
// change password
const jsonParser = bodyParser.json();

// TODO:
// start session (create uuid, store in db with user id, send to client in response)
// create way to extract session (read from DB) for all authenticated requests (reading todos)
// create way to end session (delete from DB)

const SESSION_COOKIE_NAME = "sessionId";

const attachSessionCookieToResponse = (res: Response, sessionId: string) => {
  res.cookie(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
  });
};

const startSession = (res: Response, userId: number) => {
  const sessionId = uuidv4();
  console.log("Session: " + sessionId + " is for user: " + userId);
  // store this sessionID in the db with the user id
  attachSessionCookieToResponse(res, sessionId);
};

// const validateSession: RequestHandler = async (req, res, next) => {
//   const sessionId = req.cookies[SESSION_COOKIE_NAME];

//   const [session, sessionLookupError] = await tryCatch(
//     db.sessions.getSession(sessionId),
//   );

//   if (sessionLookupError || !session) {
//     return res.status(HttpStatusCode.UNAUTHORIZED).send();
//   }

//   // TODO: implement session expiration and check it here

//   req.userId = session.userId;
//   next();
// };

const createNewUser: Array<RequestHandler> = [
  jsonParser,
  async (req, res, next) => {
    const { email, password } = req.body;

    const [existingUsers, existingUserError] = await tryCatch(
      db.users.getUser(email),
    );

    if (existingUserError) {
      return next(existingUserError);
    }

    if (existingUsers.length > 0) {
      return next(
        new Error(
          "An account associated with this email address already exists.",
        ),
      );
    }

    const [salt, saltGenerationError] = await tryCatch(bcrypt.genSalt());

    if (saltGenerationError) {
      return next(new Error("Unable to generate a new user at this time."));
    }

    const [hashedPassword, passwordHashError] = await tryCatch(
      bcrypt.hash(password, salt),
    );

    if (passwordHashError) {
      return next(new Error("Unable to generate a new user at this time."));
    }

    const [result, insertionError] = await tryCatch(
      db.users.createUser(email, hashedPassword),
    );

    if (insertionError) {
      return next(insertionError);
    }

    if (result.affectedRows === 0) {
      return next(new Error("Unable to create user."));
    }

    startSession(res, result.insertId);

    res.status(HttpStatusCode.CREATED).send();
  },
];

const logIn: Array<RequestHandler> = [
  jsonParser,
  async (req, res, next) => {
    const { email, password } = req.body;

    const [existingUsers, existingUserError] = await tryCatch(
      db.users.getUser(email),
    );

    if (existingUserError) {
      return next(existingUserError);
    }

    if (existingUsers.length === 0) {
      return next(new Error("Log in failed. Email or password incorrect."));
    }

    const [isMatch, error] = await tryCatch(
      bcrypt.compare(password, existingUsers[0]?.hashed_password),
    );

    if (error) {
      return next(new Error("Unable to log in at this time."));
    }

    if (!isMatch) {
      return next(new Error("Log in failed. Email or password incorrect."));
    }

    startSession(res, existingUsers[0]?.id);

    res.status(HttpStatusCode.OK).send("You know the password!");
  },
];

export default { createNewUser, logIn };
