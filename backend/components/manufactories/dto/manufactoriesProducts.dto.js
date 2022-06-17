module.exports = class ManufactoryProducts {
  id;
  manufactoryId;
  productId;
  productName;
  unitId;
  unitName;
  unitShort;
  timeToProduce;

  constructor(model) {
    this.id = model.id;
    this.manufactoryId = model.manufactoryId;
    this.productId = model.productId;
    this.productName = model.productName;
    this.unitId = model.unitId;
    this.unitName = model.unitName;
    this.unitShort = model.unitShort;
    this.timeToProduce = model.timeToProduce;
  }
};
