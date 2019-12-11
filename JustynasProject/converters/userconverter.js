var User = require("../models/users").user;

class UserConverter {
  convertFromDB(user) {
    let convertedUser = new User(user.name);
    return convertedUser;
  }
}
module.exports = UserConverter;
