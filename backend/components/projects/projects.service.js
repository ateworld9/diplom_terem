const db = require('../../db');

const ApiError = require('../../exceptions/api.error');
const ProjectDto = require('./dto/projects.dto');

class ProjectsService {
  async getAllProjects() {
    const projects = await db.query('SELECT * FROM projects');
    return projects.rows.map((el) => new ProjectDto(el));
  }
  async getByProjectsByCategory(category) {
    const projects = await db.query(`SELECT p.* FROM projects p 
      join projects2category p2c on p2c.project_id = p.project_id 
      join categories c on p2c.category_id = c.category_id
      where c.alt_name = $1 
      `, [category]);

    if (!projects.rows) {
      throw ApiError.BadRequest('По данному запросу нет ни одной категории!');
    }

    return projects.rows.map((el) => new ProjectDto(el));
  }
  async getByProjectsByAltName(altName) {
    const projects = await db.query('SELECT * FROM projects where alt_name = $1', [altName]);

    if (!projects.rows[0]) {
      throw ApiError.BadRequest('Такого проекта не найден! ');
    }

    return new ProjectDto(projects.rows[0]);
  }
}

module.exports = new ProjectsService();
