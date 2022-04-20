module.exports = class UserDto {
  id;
  email;
  isActivated;

  constructor(model) {
    this.id = model.user_id;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
};
