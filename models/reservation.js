const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Reservation = db.model("Reservation", {
  date: Date,
  name: String,
  _reserver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Reservation;
