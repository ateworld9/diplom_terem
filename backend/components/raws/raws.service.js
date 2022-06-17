const db = require('../../db');

class RawsService {
  async getAllRaws() {
    try {
      const raws = await db.query(`SELECT 
       id as "id"
      ,raw_name as "rawName"
      ,raw_cost as "rawCost"
      ,unit_id as "unitId"
      FROM raws`);
      return raws.rows;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new RawsService();
