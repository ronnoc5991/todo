import db from "../models/index.js";
import bcrypt from "bcrypt";

import { tryCatch } from "../utils/tryCatch.js";
import { Controller } from "./types.js";
import HttpStatusCode from "../types/HttpStatusCode.js";

// log in
// log out
// delete user
// change password

const createNewUser: Controller = async (req, res, next) => {
  const { email, password } = req.body;

  // see if the user exists already
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

  // hash password in preparation for storage
  const saltRounds = 10;

  const [salt, saltGenerationError] = await tryCatch(
    bcrypt.genSalt(saltRounds),
  );

  if (saltGenerationError) {
    return next(new Error("Unable to generate a new user at this time."));
  }

  const [hashedPassword, passwordHashError] = await tryCatch(
    bcrypt.hash(password, salt),
  );

  if (passwordHashError) {
    return next(new Error("Unable to generate a new user at this time."));
  }

  console.log(hashedPassword);

  const [result, insertionError] = await tryCatch(
    db.users.createUser(email, hashedPassword),
  );

  if (insertionError) {
    return next(insertionError);
  }

  if (result.affectedRows === 0) {
    return next(new Error("Unable to create user."));
  }

  res.status(HttpStatusCode.CREATED).send();
};

const logIn: Controller = async (req, res, next) => {
  const { email, password } = req.body;

  // see if the user exists already
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
    bcrypt.compare(password, existingUsers[0]?.password),
  );

  if (error) {
    return next(new Error("Unable to log in at this time."));
  }

  console.log("is Match: ", isMatch);

  if (!isMatch) {
    return next(new Error("Log in failed. Email or password incorrect."));
  }

  res.status(HttpStatusCode.OK).send("You know the password!");
};

export default { createNewUser, logIn };
