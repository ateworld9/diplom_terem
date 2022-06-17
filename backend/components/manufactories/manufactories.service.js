const db = require('../../db');

const ManufactoryDto = require('./dto/manufactories.dto');

const manufactoriesPlansAdapter = (manufactories) => {
  const resManufactories = [];

  for (let i = 0; i < manufactories.length; i += 1) {
    const {
      orderId, productId, productName, productCount, timeToProduce, manufactoryId, powers,
    } = manufactories[i];
    let tempIndex = -1;
    const manufactory = resManufactories.find((el, manufactoryIndex) => {
      tempIndex = manufactoryIndex;
      return el.manufactoryId === manufactories[i].manufactoryId;
    });
    if (manufactory === undefined) {
      resManufactories.push({
        manufactoryId,
        powers,
        manufactoryPlan: [{
          orderId, productId, productName, productCount, timeToProduce,
        }],
      });
    } else {
      resManufactories[tempIndex]?.manufactoryPlan.push({
        orderId, productId, productName, productCount, timeToProduce,
      });
    }
  }
  return resManufactories;
};

class ManufactoriesService {
  async getAllManufactories() {
    try {
      const manufactories = await db.query(`SELECT 
       id as "id"
      ,workers_count as "workersCount"
      ,powers as "powers"
       FROM manufactories`);

      const specsItemsPromises = manufactories.rows.map((el) => db
        .query(`SELECT 
         mpp.id as "id"
        ,mpp.manufactory_id as "manufactoryId"
        ,mpp.product_id as "productId"
        ,p.product_name as "productName"
        ,p.unit_id as "unitId"
        ,u.unit_name as "unitName"
        ,u.unit_short as "unitShort"
        ,mpp.time_to_produce as "timeToProduce"
        FROM manufactories_produce_products mpp 
        join products p on p.id = mpp.product_id
        join units u on u.id = p.unit_id
        where mpp.manufactory_id = $1;`, [el.id]));

      let manufactoriesFull = [];
      await Promise.all(specsItemsPromises).then((values) => {
        manufactoriesFull = values.map((manufactory, i) => new ManufactoryDto(manufactories.rows[i], manufactory.rows));
      });

      return manufactoriesFull;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getManufactoriesPlan() {
    try {
      const manufactoriesPlan = await db
        .query(` SELECT 
        o.id as "orderId"
       ,p.project_name as "projectName"
       ,si.product_id as "productId"
       ,pp.product_name as "productName"
       ,si.product_count as "productCount"
       ,si.product_count * mpp.time_to_produce as "timeToProduce"
       ,m.id as "manufactoryId"
       ,m.powers as "powers"
       FROM orders o
       join projects p on o.project_id = p.project_id
       join specifications s on o.project_id = s.project_id 
       join specifications_items si on si.specification_id = s.id
       join manufactories_produce_products mpp on si.product_id = mpp.product_id
       join products pp on pp.id = si.product_id
       right join manufactories m on m.id = mpp.manufactory_id`);

      return manufactoriesPlansAdapter(manufactoriesPlan.rows);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new ManufactoriesService();
