
DROP TABLE IF EXISTS tokens;
CREATE TABLE tokens (
  tokenId serial PRIMARY KEY,
  userId integer REFERENCES users(userId) ON DELETE SET NULL,
  refreshToken varchar(255)
)
