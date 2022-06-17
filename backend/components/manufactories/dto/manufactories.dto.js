module.exports = class ManufactoryDto {
  id;
  workersCount;
  powers;
  manufactoryProduceProducts;

  constructor(model, manufactoryProduceProducts) {
    this.id = model.id;
    this.workersCount = model.workersCount;
    this.powers = model.powers;
    this.manufactoryProduceProducts = manufactoryProduceProducts;
  }
};
