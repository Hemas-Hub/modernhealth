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

### Run the API
1. Run the command `node index.js`
2. This will start the service. You can check the APIs by running these example URLs - 
```
http://localhost:3000/programs, 
http://localhost:3000/program/1, 
http://localhost:3000/section/1
```

### How to test
1. Run the command `./node_modules/mocha/bin/mocha`
2. It has 7 tests, 6 working and 1 skipped (only works with test DB setup). Running the above command should pass 6 tests and keep 1 test in pending state


### Out of Scope for Version 1:
1. No typescript
2. No ORM
3. No DTO
4. No authentication
5. Not tracking user action
6. No custom exception handlers
7. Used random string for image paths
8. Creation and usage of test DB

### Scope for expansion:
1. Remember user's choice of activities from previous selection using below table:
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
3. The tests are currently using main DB to test the functionality. I have created a file `test/postgresql_ddl_test` for DDL statements for test DB. The ideal scenario is to use a test DB through existing frameworks. For v2, we can extend the scope by usage of test DB and extensive testing of cases. There are couple of spots where the comments mention the usage of test DB and rows in the functional test cases