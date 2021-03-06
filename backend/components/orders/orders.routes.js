const Router = require('express');
const ordersController = require('./orders.controller');

const router = new Router();

router.get('/orders', ordersController.getOrders);
router.get('/orders/:date', ordersController.getOrdersByDate);
router.post('/order', ordersController.createOrder);

module.exports = router;
