const Router = require('express');
const projectsController = require('./projects.controller');

const router = new Router();

router.get('/projects', projectsController.getProjects);
router.get('/projects/:category', projectsController.getProjectsByCategory);
router.get('/project/:altName', projectsController.getProjectsByAltName);

module.exports = router;
