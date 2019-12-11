const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

class User {
  constructor(name) {
    this.name = name;
  }
}

module.exports = { model: mongoose.model("User", userSchema), user: User };
