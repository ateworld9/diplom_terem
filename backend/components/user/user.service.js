const bcrypt = require('bcrypt');
const uuid = require('uuid');
const db = require('../../db');

const mailService = require('../mail/mail.service');
const tokenService = require('../token/token.service');
const UserDto = require('./dto/user.dto');
const ApiError = require('../../exceptions/api.error');

class UserService {
  async registration(email, password) {
    const user = await db.query('SELECT * FROM users where email = $1', [email]);
    if (user.rows[0] !== undefined) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    let newUser;
    try {
      newUser = await db.query('INSERT INTO users (email, password, activationlink) VALUES ($1, $2, $3) RETURNING *', [email, hashPassword, activationLink]);
    } catch (error) {
      throw ApiError.BadRequest('Ошибка создания пользователя при регистрации');
    }
    if (newUser) {
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

      const userDto = new UserDto(newUser.rows[0]);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    }
    throw ApiError.BadRequest('Ошибка создания пользователя при регистрации');
  }

  async activate(activationLink) {
    const user = db.query('SELECT * FROM users where activationlink = $1', [activationLink]);
    if (user.rows?.[0] === undefined) {
      throw ApiError.BadRequest('Не корректная ссылка активации');
    }
    await db.query('UPDATE users set isactivated = true where activationlink = $1', [activationLink]);
  }

  async login(email, password) {
    const user = await db.query('SELECT * FROM users where email = $1', [email]);
    if (user.rows?.[0] === undefined) {
      throw ApiError.BadRequest(`Пользователь с таким email:${email} не найден!`);
    }

    const isPassEqual = await bcrypt.compare(password, user.rows?.[0].password);
    if (!isPassEqual) {
      throw ApiError.BadRequest('Неверный пароль!');
    }

    const userDto = new UserDto(user.rows?.[0]);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const tokenData = await tokenService.removeToken(refreshToken);
    return tokenData;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await db.query('SELECT * FROM users where user_id = $1', [userData.user_id]);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
