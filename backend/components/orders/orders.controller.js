const ordersService = require('./orders.service');

class OrdersController {
  async getOrders(req, res, next) {
    try {
      const ordersData = await ordersService.getOrders();
      res.json(ordersData);
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req, res, next) {
    try {
      const {
        customerFio, projectId, orderDate, address,
      } = req.body;
      const ordersData = await ordersService.createOrder(customerFio, projectId, orderDate, address);
      res.json(ordersData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrdersController();
