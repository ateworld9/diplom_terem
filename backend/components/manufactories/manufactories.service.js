const db = require('../../db');

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

const manufactoriesSpvochnikAdapter = (manufactories) => {
  const resManufactories = [];
  for (let i = 0; i < manufactories.length; i += 1) {
    const {
      manufactoryId, manufactoryName, equipmentId, equipmentName, serialCode, powers,
    } = manufactories[i];
    let tempIndex = -1;
    const manufactory = resManufactories.find((el, manufactoryIndex) => {
      tempIndex = manufactoryIndex;
      return el.manufactoryId === manufactories[i].manufactoryId;
    });
    if (manufactory === undefined) {
      resManufactories.push({
        manufactoryId,
        manufactoryName,
        manufactoryEquipment: [{
          equipmentId, equipmentName, serialCode, powers,
        }],
      });
    } else {
      resManufactories[tempIndex]?.manufactoryEquipment.push({
        equipmentId, equipmentName, serialCode, powers,
      });
    }
  }

  return resManufactories;
};

const manufactoriesProduceProductsAdapter = (productsProduceArr) => {
  const resArr = [];
  for (let i = 0; i < productsProduceArr.length; i += 1) {
    const {
      manufactoryId, manufactoryName, equipmentId, equipmentName, serialCode, powers, productId, productName, unitShort, timeToProduce,
    } = productsProduceArr[i];
    let tempIndex = -1;
    const manufactory = resArr.find((el, resIndex) => {
      tempIndex = resIndex;
      return el.manufactoryId === productsProduceArr[i].manufactoryId;
    });
    if (manufactory === undefined) {
      resArr.push({
        manufactoryId,
        manufactoryName,
        manufactoryProduceProducts: [{
          productId, productName, unitShort, timeToProduce, equipmentId, equipmentName, serialCode, powers,
        }],

      });
    } else {
      resArr[tempIndex]?.manufactoryProduceProducts.push({
        productId, productName, unitShort, timeToProduce, equipmentId, equipmentName, serialCode, powers,
      });
    }
  }
  return resArr;
};

class ManufactoriesService {
  async getManufactoriesSpravochnik() {
    try {
      const manufactories = await db.query(`
      select 
         m.id  as "manufactoryId"
        ,m.manufactory_name as "manufactoryName"
        ,e.equipment_id as "equipmentId"
        ,e.equip_name as "equipmentName"
        ,e.serial_code as "serialCode"
        ,e.powers as "powers"
      from manufactories m
      join manufactories2equipments m2e on m.id = m2e.manufactory_id
      join equipments e on m2e.equipment_id = e.equipment_id
      `);
      return manufactoriesSpvochnikAdapter(manufactories.rows);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getManufactoriesProduceProductsSpravochnik() {
    try {
      const manufactoriesProduceProducts = await db.query(`
      select
        m.id as "manufactoryId"
        ,m.manufactory_name as "manufactoryName"
        ,e.equipment_id as "equipmentId"
        ,e.equip_name as "equipmentName"
        ,e.serial_code as "serialCode"
        ,e.powers as "powers"
        ,p.id as "productId"
        ,p.product_name as "productName"
        ,u.unit_short as "unitShort"
        ,mpp.time_to_produce as "timeToProduce"
      from manufactories_produce_products mpp
      join equipments e on e.equipment_id = mpp.equipment_id
      join manufactories2equipments m2e on m2e.equipment_id = e.equipment_id
      join manufactories m on m.id = m2e.manufactory_id
      join products p on p.id = mpp.product_id
      join units u on u.id = p.unit_id
      order by p.id
      `);
      return manufactoriesProduceProductsAdapter(manufactoriesProduceProducts.rows);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getManufactoriesPlan() {
    try {
      const manufactoriesPlan = await db.query(` 
       SELECT 
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
