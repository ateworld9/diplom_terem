const projectsService = require('./projects.service');

class ProjectsController {
  async getProjects(req, res, next) {
    try {
      const projectsData = await projectsService.getAllProjects();
      res.json(projectsData);
    } catch (error) {
      next(error);
    }
  }
  async getProjectsByCategory(req, res, next) {
    try {
      const { category } = req.params;

      const projectsData = await projectsService.getByProjectsByCategory(category);
      res.json(projectsData);
    } catch (error) {
      next(error);
    }
  }

  async getProjectsByAltName(req, res, next) {
    try {
      const { altName } = req.params;
      const projectsData = await projectsService.getByProjectsByAltName(altName);
      res.json(projectsData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectsController();
