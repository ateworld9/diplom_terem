const Router = require('express');
const { body } = require('express-validator');
const userController = require('./user.controller');

const router = new Router();

router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3 }),
  userController.registration,
);
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 3 }),
  userController.login,
);
router.get('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

module.exports = router;
