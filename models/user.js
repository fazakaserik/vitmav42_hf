const Schema = require("mongoose").Schema;
const db = require("../config/db");

const User = db.model("User", {
  first_name: String,
  last_name: String,
  email: String,
  tel: String,
  username: String,
  password: String,
});

module.exports = User;
