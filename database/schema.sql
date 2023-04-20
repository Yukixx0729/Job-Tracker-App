DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS jobs
-- DROP TABLE IF EXISTS to_do???

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);


CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title TEXT,
  company TEXT,
  description TEXT,
  date !!!! what should the date represent?
);

