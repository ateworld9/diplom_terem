
DROP TABLE IF EXISTS tokens;
CREATE TABLE tokens (
  token_id serial PRIMARY KEY,
  user_id integer REFERENCES users(user_id) ON DELETE SET NULL,
  refresh_token varchar(255)
)
