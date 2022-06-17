const { validationResult } = require('express-validator');

const db = require('../../db');
const ApiError = require('../../exceptions/api.error');
const userService = require('./user.service');

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await db.query('SELECT * FROM users');
      res.json(users.rows);
    } catch (err) {
      next(err);
    }
  }
  async getUserById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await db.query('SELECT * FROM users where user_id = $1', [id]);
      res.json(user.rows[0]);
    } catch (err) {
      next(err);
    }
  }
  async updateUser(req, res, next) {
    const {
      id, email, login, password,
    } = req.body;
    try {
      const updatedUser = await db.query('UPDATE users set email = $1, login = $2, password = $3 where user_id = $4', [email, login, password, id]);
      res.json(updatedUser.rows[0]);
    } catch (err) {
      next(err);
    }
  }
  async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const user = await db.query('DELETE FROM users where user_id = $1', [id]);
      res.json(user.rows[0]);
    } catch (err) {
      next(err);
    }
  }

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      } else {
        const { email, password } = req.body;
        const userData = await userService.registration(email, password);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.json(userData);
      }
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      } else {
        const { email, password } = req.body;
        const userData = await userService.login(email, password);
        console.log(userData);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.json(userData);
      }
    } catch (err) {
      next(err);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.json(token);
    } catch (err) {
      next(err);
    }
  }
  async activate(req, res, next) {
    const activationLink = req.params.link;

    try {
      await userService.activate(activationLink);
      res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }

      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true
      });

      res.json(userData);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
