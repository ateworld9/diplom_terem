const categoriesService = require('./categories.service');

class CategoriesController {
  async getCategories(req, res, next) {
    try {
      const categoriesData = await categoriesService.getAllCategories();
      res.json(categoriesData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoriesController();
