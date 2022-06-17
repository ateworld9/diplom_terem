const Router = require('express');
const productsController = require('./products.controller');

const router = new Router();

router.get('/products', productsController.getProducts);

module.exports = router;
