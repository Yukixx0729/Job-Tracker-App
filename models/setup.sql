DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS to_do CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS file CASCADE;


CREATE TABLE users (
id SERIAL PRIMARY KEY,
user_name VARCHAR (254) NOT NULL,
email VARCHAR (254) NOT NULL,
password_hash TEXT NOT NULL
);

CREATE TABLE jobs (
id SERIAL PRIMARY KEY,
title VARCHAR (254),
company VARCHAR (254) ,
location VARCHAR (254),
description TEXT,
job_url TEXT,
due_date DATE NOT NULL,
stages TEXT,
  user_id INT,
  CONSTRAINT fk_jobs_users
  FOREIGN KEY(user_id)
  REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE to_do (
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
due_date DATE NOT NULL,
priority VARCHAR(10) NOT NULL CHECK (priority IN ('low', 'moderate', 'high')),
status VARCHAR(15) NOT NULL CHECK (status IN ('planned', 'in progress', 'completed')),
  user_id INT,
  CONSTRAINT fk_to_do_users
  FOREIGN KEY(user_id)
  REFERENCES users(id) ON DELETE CASCADE,
  job_id INT,
  CONSTRAINT fk_to_do_jobs
  FOREIGN KEY(job_id)
  REFERENCES jobs(id) ON DELETE CASCADE
);


CREATE TABLE contacts (
id SERIAL PRIMARY KEY,
contact_name TEXT NOT NULL,
company_name TEXT,
email TEXT,
phone_number VARCHAR,
notes TEXT,
  user_id INT,
  CONSTRAINT fk_contacts_users
  FOREIGN KEY(user_id)
  REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS file CASCADE;
CREATE TABLE file (
    id SERIAL PRIMARY KEY,
    name TEXT,
    url TEXT,
    user_id INT,
  CONSTRAINT fk_file_users
  FOREIGN KEY(user_id)
  REFERENCES users(id) ON DELETE CASCADE
);

TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE jobs CASCADE;
TRUNCATE TABLE to_do CASCADE;
TRUNCATE TABLE contacts CASCADE;
TRUNCATE TABLE file CASCADE;

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE jobs_id_seq RESTART WITH 1;
ALTER SEQUENCE to_do_id_seq RESTART WITH 1;
ALTER SEQUENCE contacts_id_seq RESTART WITH 1;
ALTER SEQUENCE file_id_seq RESTART WITH 1;


INSERT INTO users (user_name, email, password_hash)
VALUES 
  ('John', 'john@hotmail.com', ''),
  ('Jane', 'jane@hotmail.com', ''),
  ('Bob', 'bob@hotmail.com', '');

INSERT INTO jobs (title, company, location, description, job_url, due_date, stages, user_id)
VALUES
  ('Software Engineer', 'Google', 'Melbourne', 'Develop and maintain software applications.', 'https://www.google.com/careers', '2023-06-01', 'Application', 1),
  ('Marketing Manager', 'Nike', 'Sydney', 'Plan and execute marketing campaigns for the company.', 'https://jobs.nike.com/', '2023-07-15', 'Phone Interview', 2),
  ('Graphic Designer', 'Apple', 'Brisbane', 'Create visual designs for various digital and print mediums.', 'https://www.apple.com/jobs/us/design', '2023-05-10', 'Complete', 3),
  ('Fancy Engineer', 'Google', 'Melbourne', 'Develop and maintain software applications.', 'https://www.google.com/careers', '2023-05-04', 'Application', 1),
  ('Cute Manager', 'Nike', 'Sydney', 'Plan and execute marketing campaigns for the company.', 'https://jobs.nike.com/', '2023-07-12', 'Phone Interview', 2),
  ('Hungry Designer', 'Apple', 'Brisbane', 'Create visual designs for various digital and print mediums.', 'https://www.apple.com/jobs/us/design', '2023-05-10', 'Complete', 2),
  ('Sleepy Engineer', 'Google', 'Melbourne', 'Develop and maintain software applications.', 'https://www.google.com/careers', '2023-06-04', 'Application', 2),
  ('Dopey Manager', 'Nike', 'Sydney', 'Plan and execute marketing campaigns for the company.', 'https://jobs.nike.com/', '2023-04-29', 'Phone Interview', 1),
  ('Nerdy Designer', 'Apple', 'Brisbane', 'Create visual designs for various digital and print mediums.', 'https://www.apple.com/jobs/us/design', '2023-04-30', 'Complete', 3);

INSERT INTO to_do (title, description, due_date, priority, status, user_id, job_id) 
VALUES 
  ('Complete project proposal', 'Finish writing up the proposal and submit to supervisor for review', '2023-05-02', 'high', 'in progress', 1, 1),
  ('Update resume', 'Add latest work experience and achievements to the resume', '2023-04-30', 'moderate', 'planned', 2, NULL),
  ('Schedule networking meeting', 'Reach out to a contact and schedule a meeting to discuss career opportunities', '2023-05-10', 'moderate', 'planned', 3, NULL);

INSERT INTO contacts (contact_name, company_name, email, phone_number, notes, user_id)
VALUES 
  ('Alice Smith', 'ABC Inc.', 'alice@abc.com', 0400111222, 'Met at conference', 1),
  ('Bob Johnson', 'XYZ Corp.', 'bob@xyz.com', 0400111333, 'Potential client', 2),
  ('Charlie Brown', 'DEF Co.', 'charlie@def.com', 0400111333, 'Former colleague', 3);