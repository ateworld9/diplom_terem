module.exports = class SpecificationsDto {
  id;
  projectId;
  neededProducts;

  constructor(model, neededProducts) {
    this.id = model.id;
    this.projectId = model.projectId;
    this.neededProducts = neededProducts;
  }
};
