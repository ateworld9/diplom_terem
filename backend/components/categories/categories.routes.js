const Router = require('express');
const categoriesController = require('./categories.controller');

const router = new Router();

router.get('/categories', categoriesController.getCategories);

module.exports = router;
