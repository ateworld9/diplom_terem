module.exports = class ProjectDto {
  id;
  projectName;
  altName;
  price;
  imgPath;

  constructor(model) {
    this.id = model.project_id;
    this.projectName = model.project_name;
    this.altName = model.alt_name;
    this.price = model.price;
    this.imgPath = model.img_path;
  }
};
