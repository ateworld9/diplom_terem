const jwt = require('jsonwebtoken');

const db = require('../../db');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '60m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await db.query('SELECT * FROM tokens where user_id = $1', [userId]);
    if (tokenData.rows[0]) {
      await db.query('UPDATE tokens set refresh_token = $1 where token_id = $2', [refreshToken, tokenData.rows[0].token_id]);
      return;
    }

    await db.query('INSERT INTO tokens (user_id,  refresh_token) VALUES ($1, $2) RETURNING *', [userId, refreshToken]);
  }

  async removeToken(refreshToken) {
    const tokenData = await db.query('DELETE FROM tokens where refresh_token = $1', [refreshToken]);
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await db.query('SELECT * FROM tokens where refresh_token = $1', [refreshToken]);
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
