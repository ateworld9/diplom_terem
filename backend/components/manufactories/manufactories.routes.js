const Router = require('express');
const manufactoriesController = require('./manufactories.controller');

const router = new Router();

router.get('/manufactoriesSpravochnik', manufactoriesController.getManufactoriesSpravochnik);
router.get('/manufactoriesProduceProducts', manufactoriesController.getManufactoriesProduceProducts);
router.get('/calculateManufactoriesPlans/:date', manufactoriesController.calculateManufactoriesPlan);
router.get('/manufactoriesPlans/:docDate', manufactoriesController.getManufactoriesPlan);

module.exports = router;
