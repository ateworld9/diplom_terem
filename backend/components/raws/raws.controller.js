const specificationsService = require('./raws.service');

class SpecificationsController {
  async getSpecifications(req, res, next) {
    try {
      const specificationsData = await specificationsService.getAllSpecifications();

      res.json(specificationsData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SpecificationsController();
