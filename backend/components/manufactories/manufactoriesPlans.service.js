/* eslint-disable no-tabs */
const db = require('../../db');

const manufactoriesPlansAdapter = (plans) => {
  const resPlans = [];
  for (let i = 0; i < plans.length; i += 1) {
    const {
      orderId, manufactoryId, powers, docDate, equipmentName, productId, productName, productCount, timeToProduce, unitShort,
    } = plans[i];
    let tempIndex = -1;
    const manufactory = resPlans.find((el, manufactoryIndex) => {
      tempIndex = manufactoryIndex;
      return el.manufactoryId === plans[i].manufactoryId;
    });
    if (manufactory === undefined) {
      resPlans.push({
        manufactoryId,
        docDate,
        manufactoryPlan: [{
          orderId, equipmentName, powers, productId, productName, productCount, timeToProduce, unitShort,
        }],
      });
    } else {
      resPlans[tempIndex]?.manufactoryPlan.push({
        orderId, equipmentName, powers, productId, productName, productCount, timeToProduce, unitShort,
      });
    }
  }
  return resPlans;
};

class ManufactoriesPlansService {
  async calculateManufactoriesPlan(fromDate, docDate) {
    try {
      await db.query(`
        DO $$
        DECLARE
          rec_outer record;
          rec_inner record;
          powerr integer default 0;
        BEGIN
          <<inn>>
          FOR rec_inner IN (SELECT equipment_id, powers FROM equipments) LOOP
          powerr:= 0;
            <<oute>>
            FOR rec_outer IN (
                      SELECT * FROM orders o 
                      join specifications s on o.project_id = s.project_id
                      join specifications_items si on si.specification_id = s.id
                      join manufactories_produce_products mpp on mpp.product_id = si.product_id
                      WHERE o.order_date > to_date( '${fromDate}' , 'YYYY-MM-DD') and mpp.equipment_id = rec_inner.equipment_id) LOOP
              CONTINUE inn WHEN rec_inner.powers < powerr + rec_outer.time_to_produce;
              powerr:= powerr + rec_outer.time_to_produce;
               INSERT INTO manufactories_plans 
               (equipment_id, order_id, project_id, product_id, product_count, time_to_produce, doc_date)
               VALUES
               (rec_outer.equipment_id, rec_outer.id , rec_outer.project_id ,rec_outer.product_id ,rec_outer.product_count ,rec_outer.time_to_produce, to_date( '${docDate}' , 'YYYY-MM-DD'));
            END LOOP oute;
          END LOOP inn;
        END;
        $$;`);
      return { value: true };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getManufactoriesPlan(docDate) {
    try {
      const manufactoriesPlans = await db.query(`
      select 
         m.id as "manufactoryId"
        ,mp.doc_date as "docDate"
        ,e.equip_name as "equipmentName"
        ,e.powers as "powers"
        ,pr.id as "productId"
        ,pr.product_name as "productName"
        ,mp.product_count as "productCount"
        ,mp.time_to_produce as "timeToProduce"
        ,u.unit_short as "unitShort"
        ,mp.order_id as "orderId"
      from manufactories_plans mp
      join equipments e on e.equipment_id = mp.equipment_id
      join manufactories2equipments m2e on m2e.equipment_id = e.equipment_id
      join manufactories m on m.id = m2e.manufactory_id
      join orders o on o.id = mp.order_id
      join projects p on p.project_id = mp.project_id
      join products pr on pr.id = mp.product_id
      join units u on pr.unit_id = u.id
      where mp.doc_date = to_date('${docDate}', 'YYYY-MM-DD');
      `);
      return manufactoriesPlansAdapter(manufactoriesPlans.rows);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getManufactoriesPlans() {
    try {
      const manufactoriesPlans = await db.query(`
      select 
         m2e.manufactory_id as "manufactoryId"
        ,mp.doc_date as "docDate"
        ,e.equip_name as "equipmentName"
        ,pr.product_name as "productName"
        ,mp.product_count as "productCount"
        ,mp.time_to_produce as "timeToProduce"
        ,u.unit_short as "unitShort"
      from manufactories_plans mp
      join equipments e on e.equipment_id = mp.equipment_id
      join manufactories2equipments m2e on m2e.equipment_id = e.equipment_id
      join orders o on o.id = mp.order_id
      join projects p on p.project_id = mp.project_id
      join products pr on pr.id = mp.product_id
      join units u on pr.unit_id = u.id
      `);
      return manufactoriesPlansAdapter(manufactoriesPlans.rows);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

module.exports = new ManufactoriesPlansService();
