# Steps to run the program:
### Install Postgres

1. brew install postgresql
2. brew services start postgresql
3. Use the default postgres port : 5432
4. Once the psql client is open on the terminal, create user 'me'
`CREATE ROLE me WITH LOGIN PASSWORD 'password'`

5. Switch to user 'me'
`-d postgres -U me`

### Install node js

1. Run the commands in `postgresql_ddl` to create db and required tables
2. Run the insert commands in `postgresql_dml` to load data
3. Run `npm i` in the project folder
4. To run test cases use the command `npm test`


### Out of Scope for Version 1:
1. No typescript
2. No ORM
3. No DTO
4. No authentication
5. Not tracking user action
6. No custom exception handlers
7. Used random string for image paths

### Scope for expansion:
1. Remeber user's choice of activities from previous selection using below table:
```
    CREATE TABLE activity_question_user_opt(
	id SERIAL PRIMARY KEY,
	qid INTEGER NOT NULL,
	option VARCHAR(250) NOT NULL,
	user_id BIGINT NOT NULL,
	last_modified_date TIMESTAMP DEFAULT current_timestamp,
	last_modified_by TEXT NOT NULL DEFAULT current_user,
	CONSTRAINT fk_aqo_question FOREIGN KEY(qid)  REFERENCES activity_question(id)
)
```
2. Implement caching to save the questions and options for a given activity
