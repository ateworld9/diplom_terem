module.exports = class SpecificationsItemsDto {
  id;
  productId;
  productName;
  productCount;
  unitId;
  unitName;
  unitShort;

  constructor(model) {
    this.id = model.id;
    this.productId = model.productId;
    this.productName = model.productName;
    this.productCount = model.productCount;
    this.unitId = model.unitId;
    this.unitName = model.unitName;
    this.unitShort = model.unitShort;
  }
};
