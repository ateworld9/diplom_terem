const db = require('../../db');

const ApiError = require('../../exceptions/api.error');

class ProjectsService {
  async getAllProjects() {
    try {
      const projects = await db.query(`SELECT 
       project_id as "projectId"
      ,project_name as "projectName"
      ,alt_name as "altName"
      ,price as "price"
      ,img_path as "imgPath"
      FROM projects`);
      return projects.rows;
    } catch (error) {
      return error;
    }
  }
  async getByProjectsByCategory(category) {
    try {
      const projects = await db.query(`SELECT 
       p.project_id as "projectId"
      ,p.project_name as "projectName"
      ,p.alt_name as "altName"
      ,p.price as "price"
      ,p.img_path as "imgPath"
      FROM projects p 
      join projects2category p2c on p2c.project_id = p.project_id 
      join categories c on p2c.category_id = c.category_id
      where c.alt_name = $1`, [category]);

      if (!projects.rows) {
        throw ApiError.BadRequest('По данному запросу нет ни одной категории!');
      }

      return projects.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getByProjectsByAltName(altName) {
    try {
      const projects = await db.query(`SELECT   
       p.project_id as "projectId"
      ,p.project_name as "projectName"
      ,p.alt_Name as "altName"
      ,p.price as "price"
      ,p.img_path as "imgPath" 
      FROM projects p 
      where alt_name = $1`, [altName]);

      if (!projects.rows[0]) {
        throw ApiError.BadRequest('Такого проекта не найден! ');
      }

      return projects.rows[0];
    } catch (error) {
      return error;
    }
  }
}

module.exports = new ProjectsService();
