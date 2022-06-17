const Router = require('express');
const rawsController = require('./raws.controller');

const router = new Router();

router.get('/raws', rawsController.getRaws);

module.exports = router;
