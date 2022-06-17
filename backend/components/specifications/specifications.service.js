const db = require('../../db');

const SpecificationsDto = require('./dto/specifications.dto');

class SpecificationsService {
  async getAllSpecifications() {
    try {
      const specifications = await db.query('SELECT * FROM specifications');

      const specsItemsPromises = specifications.rows.map((el) => db
        .query(`SELECT 
         si.id as "id"
        ,si.product_id as "productId"
        ,p.product_name as "productName"
        ,si.product_count as "productCount"
        ,si.unit_id as "unitId"
        ,u.unit_name as "unitName"
        ,u.unit_short as "unitShort"
      FROM specifications_items si 
      join products p on p.id = si.product_id
      join units u on u.id = si.unit_id
      
      where specification_id = $1`, [el.id]));

      let specsItems = [];
      await Promise.all(specsItemsPromises).then((values) => {
        specsItems = values[0].rows;
      });

      return specifications.rows.map((el) => new SpecificationsDto(el, specsItems));
    } catch (error) {
      return error;
    }
  }
}

module.exports = new SpecificationsService();
