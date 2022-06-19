const manufactoriesService = require('./manufactories.service');
const manufactoriesPlansService = require('./manufactoriesPlans.service');

class ManufactoriesController {
  async getManufactoriesSpravochnik(req, res, next) {
    try {
      const manufactoriesData = await manufactoriesService.getManufactoriesSpravochnik();
      res.json(manufactoriesData);
    } catch (error) {
      next(error);
    }
  }
  async getManufactoriesProduceProducts(req, res, next) {
    try {
      const manufactoriesData = await manufactoriesService.getManufactoriesProduceProductsSpravochnik();
      res.json(manufactoriesData);
    } catch (error) {
      next(error);
    }
  }
  async calculateManufactoriesPlan(req, res, next) {
    try {
      const { date } = req.params;
      const manufactoriesData = await manufactoriesPlansService.calculateManufactoriesPlan(date, date);
      res.json(manufactoriesData);
    } catch (error) {
      next(error);
    }
  }
  async getManufactoriesPlan(req, res, next) {
    try {
      const { docDate } = req.params;
      const manufactoriesData = await manufactoriesPlansService.getManufactoriesPlan(docDate);
      res.json(manufactoriesData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ManufactoriesController();
