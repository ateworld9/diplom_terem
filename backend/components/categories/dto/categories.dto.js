module.exports = class CategoryDto {
  categoryId;
  name;
  altName;
  priceFrom;
  imgPath;

  constructor(model) {
    this.categoryId = model.category_id;
    this.name = model.category_name;
    this.altName = model.alt_name;
    this.priceFrom = model.price_from;
    this.imgPath = model.img_path;
  }
};
