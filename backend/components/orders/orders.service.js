const db = require('../../db');

const ordersAdapter = (orders) => {
  const resOrders = [];
  for (let i = 0; i < orders.length; i += 1) {
    const {
      id, orderId, customerFio, projectId, orderDate, address, projectName, price, specificationId, productId, productName, productCount, unitId, unitName, unitShort,
    } = orders[i];
    let tempIndex = -1;
    const order = resOrders.find((el, orderIndex) => {
      tempIndex = orderIndex;
      return el.orderId === orders[i].orderId;
    });
    if (!order) {
      resOrders.push({
        orderId,
        customerFio,
        orderDate,
        price,
        address,
        project: {
          projectId,
          projectName,
          projectSpecification: {
            specificationId,
            specificationItems: [
              {
                id,
                productId,
                productName,
                productCount,
                unitId,
                unitName,
                unitShort,
              },
            ],
          },
        },
      });
    } else {
      resOrders[tempIndex].project.projectSpecification.specificationItems.push({
        id,
        productId,
        productName,
        productCount,
        unitId,
        unitName,
        unitShort,
      });
    }
  }
  return resOrders;
};

class OrdersService {
  async getOrders() {
    try {
      const orders = await db.query(`
      SELECT 
       o.id as "orderId"
      ,o.customer_fio as "customerFio"
      ,o.project_id as "projectId"
      ,o.order_date as "orderDate"
      ,o.address as "address"
      ,p.project_name as "projectName"
      ,p.price as "price"
      ,si.id as "id"
      ,si.specification_id as "specificationId"
      ,si.product_id as "productId"
      ,pp.product_name as "productName"
      ,si.product_count as "productCount"
      ,si.unit_id as "unitId"
      ,u.unit_name as "unitName"
      ,u.unit_short as "unitShort"
      FROM orders o
      join projects p on o.project_id = p.project_id
      join specifications s on o.project_id = s.project_id 
      join specifications_items si on si.specification_id = s.id
      join products pp on pp.id = si.product_id
      join units u on u.id = si.unit_id
      `);

      return ordersAdapter(orders.rows);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createOrder(customerFio, projectId, orderDate, address) {
    try {
      const orders = await db.query(`
      INSERT INTO orders
      (customer_fio, project_id, order_date, address)
      VALUES ( $1, $2, $3)
      RETURNING
      customer_fio as "customerFio"
      ,project_id as "projectId"
      ,order_date as "orderDate"
      ,address
      `, [customerFio, projectId, orderDate, address]);

      return orders;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new OrdersService();
