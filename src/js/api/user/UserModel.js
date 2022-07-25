export default class UserModel{
  constructor ({id, name}) {
    this.id = id;
    this.name = name;
  }

  static FromJson(json) {
    return new UserModel({
      id: json.id,
      name: json.name
    });
  }
}