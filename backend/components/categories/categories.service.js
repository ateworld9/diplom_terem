const db = require('../../db');
const CategoryDto = require('./dto/categories.dto');

class CategoriesService {
  async getAllCategories() {
    const categories = await db.query('SELECT * FROM categories');

    return categories.rows.map((el) => new CategoryDto(el));
  }
}

module.exports = new CategoriesService();
