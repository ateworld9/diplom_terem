const { validationResult } = require('express-validator');

const ApiError = require('../../exceptions/api.error');
const userService = require('./user.service');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      } else {
        const { email, password } = req.body;

        console.log(req.body);
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
