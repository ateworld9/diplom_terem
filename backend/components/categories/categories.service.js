const db = require('../../db');

class CategoriesService {
  async getAllCategories() {
    try {
      const categories = await db.query(`SELECT 
      category_id as"categoryId"
      ,category_name as"categoryName"
      ,alt_name as"altName"
      ,price_from as"priceFrom"
      ,img_path as"imgPath"
      FROM categories`);

      return categories.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new CategoriesService();
