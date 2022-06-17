const bcrypt = require('bcrypt');
const uuid = require('uuid');
const db = require('../../db');

// const mailService = require('../mail/mail.service');
const tokenService = require('../token/token.service');
const ApiError = require('../../exceptions/api.error');

class UserService {
  async registration(email, password) {
    const users = await db.query(`SELECT 
       user_id as "userId"
      ,email as "email"
      ,password as "password"
      ,is_activated as "isActivated"
      ,activation_link as "activationLink"
      FROM users where email = $1`, [email]);
    if (users.rows[0] !== undefined) {
      console.log(users.rows[0]);
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    let newUser;
    try {
      newUser = await db.query(`INSERT INTO users (email, password, activation_link) VALUES ($1, $2, $3) 
      RETURNING user_id as "userId"
      ,email as "email"
      ,password as "password"
      ,is_activated as "isActivated"
      ,activation_link as "activationLink"`, [email, hashPassword, activationLink]);
      console.log('newUser>>>>>>>>>>>>>>>>>>>>', newUser);
    } catch (error) {
      throw ApiError.BadRequest('Ошибка создания пользователя при регистрации');
    }
    if (newUser) {
      // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

      const user = newUser.rows[0];
      console.log(user);
      const tokens = tokenService.generateTokens({ ...user });
      console.log(tokens, tokens.accessToken.length, tokens.refreshToken.length);
      await tokenService.saveToken(user.id, tokens.refreshToken);

      return {
        ...tokens,
        user,
      };
    }
    throw ApiError.BadRequest('Ошибка создания пользователя при регистрации');
  }

  async activate(activationLink) {
    try {
      const user = db.query(`SELECT 
      user_id as "userId"
      ,email as "email"
      ,password as "password"
      ,is_activated as "isActivated"
      ,activation_link as "activationLink"
      FROM users where activation_link = $1`, [activationLink]);
      if (user.rows?.[0] === undefined) {
        throw ApiError.BadRequest('Не корректная ссылка активации');
      }
      return await db.query('UPDATE users set is_activated = true where activation_link = $1', [activationLink]);
    } catch (error) {
      return error;
    }
  }

  async login(email, password) {
    const users = await db.query(`SELECT
       user_id as "userId"
      ,email as "email"
      ,password as "password"
      ,is_activated as "isActivated"
      ,activation_link as "activationLink"
      FROM users where email = $1`, [email]);

    if (users.rows?.[0] === undefined) {
      throw ApiError.BadRequest(`Пользователь с таким email:${email} не найден!`);
    }
    const user = users.rows[0];
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest('Неверный пароль!');
    }

    const tokens = tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async logout(refreshToken) {
    try {
      const tokenData = await tokenService.removeToken(refreshToken);
      return tokenData;
    } catch (error) {
      return error;
    }
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = tokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
      }

      const user = await db.query(`SELECT 
      user_id as "userId"
      ,email as "email"
      ,password as "password"
      ,is_activated as "isActivated"
      ,activation_link as "activationLink"
      FROM users where user_id = $1`, [userData.userId]);

      const tokens = tokenService.generateTokens({ ...user });

      await tokenService.saveToken(user.id, tokens.refreshToken);
      return { ...tokens, user };
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserService();
