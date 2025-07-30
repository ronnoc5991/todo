# TODO

---

- Create client and server applications to manage TODO lists for signed in users

## Server

---

- ~~Dockerize~~
- ~~Use Node Framework~~
- ~~Typescript~~
- ~~Database~~
- ~~Basic CRUD functionality~~
- ~~Make startup rely on db! (wait for)~~
- ~~Persist DB across containers (volumes)~~
- ~~Ensure DB is created on startup (assume no existing db...)~~
- Ensure all required tables are created if they do not exist at startup
- Implement Sessions
- Create custom error classes
- Hide DB from client (do not return DB information after insertion for example)
- Use connection pool for db things?
- for every endpoint, need to verify that the expected params were found and are valid
- Own Rolled Auth

## Client

---

- Create basic UI
- Login
- List management
