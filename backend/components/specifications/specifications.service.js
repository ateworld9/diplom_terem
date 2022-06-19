const db = require('../../db');

const specificationsAdapter = (specifications) => {
  const resSpecifications = [];
  for (let i = 0; i < specifications.length; i += 1) {
    const {
      specificationId, projectId, projectName, productId, productName, productCount, unitShort,
    } = specifications[i];
    let tempIndex = -1;
    const specification = resSpecifications.find((el, specificationIndex) => {
      tempIndex = specificationIndex;
      return el.specificationId === specifications[i].specificationId;
    });
    if (specification === undefined) {
      resSpecifications.push({
        specificationId,
        projectId,
        projectName,
        specificationItems: [{
          productId, productName, productCount, unitShort,
        }],
      });
    } else {
      resSpecifications[tempIndex]?.specificationItems.push({
        productId, productName, productCount, unitShort,
      });
    }
    console.log(resSpecifications);
  }

  return resSpecifications;
};
class SpecificationsService {
  async getAllSpecifications() {
    try {
      const specifications = await db.query(`    
        SELECT 
           s.id as "specificationId"
          ,p.project_id as "projectId"
          ,p.project_name as "projectName"
          ,pr.id as "productId"
          ,pr.product_name as "productName"
          ,si.product_count as "productCount"
          ,u.unit_short as "unitShort"
        FROM specifications s
        join projects p on s.project_id = p.project_id
        join specifications_items si on s.id = si.specification_id
        join products pr on pr.id = si.product_id
        join units u on u.id = pr.unit_id
      `);
      console.log(specifications.rows);
      return specificationsAdapter(specifications.rows);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new SpecificationsService();
