const jwt = require('jsonwebtoken');

const db = require('../../db');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '60m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await db.query(`SELECT 
     token_id as "tokenId"
    ,user_id as "userId"
    ,refresh_token as "refreshToken"
    FROM tokens where user_id = $1`, [userId]);
    if (tokenData.rows[0]) {
      console.log(tokenData);
      await db.query('UPDATE tokens set refresh_token = $1 where token_id = $2', [refreshToken, tokenData.rows[0].tokenId]);
      return;
    }
    await db.query('INSERT INTO tokens (user_id,  refresh_token) VALUES ($1, $2) RETURNING *', [userId, refreshToken]);
  }

  async removeToken(refreshToken) {
    try {
      const tokenData = await db.query('DELETE FROM tokens where refresh_token = $1', [refreshToken]);
      return tokenData;
    } catch (error) {
      return error;
    }
  }

  async findToken(refreshToken) {
    try {
      const tokenData = await db.query(`SELECT 
      token_id as "tokenId"
      ,user_id as "userId"
      ,refresh_token as "refreshToken"
      FROM tokens where refresh_token = $1`, [refreshToken]);
      return tokenData;
    } catch (error) {
      return error;
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return error;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new TokenService();
