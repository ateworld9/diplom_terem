const Router = require('express');
const manufactoriesController = require('./manufactories.controller');

const router = new Router();

router.get('/manufactories', manufactoriesController.getManufactories);
router.get('/manufactoriesPlans', manufactoriesController.getManufactoriesPlan);

module.exports = router;
