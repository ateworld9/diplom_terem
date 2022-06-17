
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  	userId serial PRIMARY KEY,
  	email varchar(255) UNIQUE NOT NULL,
	password varchar(255) NOT NULL,
 	isActivated boolean DEFAULT FALSE,
	activationLink varchar(255)
)
