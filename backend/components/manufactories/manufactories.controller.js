const manufactoriesService = require('./manufactories.service');

class ManufactoriesController {
  async getManufactories(req, res, next) {
    try {
      const manufactoriesData = await manufactoriesService.getAllManufactories();
      res.json(manufactoriesData);
    } catch (error) {
      next(error);
    }
  }

  async getManufactoriesPlan(req, res, next) {
    try {
      const manufactoriesData = await manufactoriesService.getManufactoriesPlan();
      res.json(manufactoriesData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ManufactoriesController();
