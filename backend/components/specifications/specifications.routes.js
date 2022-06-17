const Router = require('express');
const specificationsController = require('./specifications.controller');

const router = new Router();

router.get('/specifications', specificationsController.getSpecifications);

module.exports = router;
