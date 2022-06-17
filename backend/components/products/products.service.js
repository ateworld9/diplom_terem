const db = require('../../db');

class ProductsService {
  async getAllProducts() {
    try {
      const products = await db.query(`SELECT 
      id as "id"
      ,product_name as  "productName"
      ,unit_id as "unitId" 
      FROM products`);
      return products.rows;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new ProductsService();
