const productsService = require('./products.service');

class ProductsController {
  async getproducts(req, res, next) {
    try {
      const productsData = await productsService.getAllProducts();
      res.json(productsData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductsController();
