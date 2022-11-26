/**
 * Checks all of the dates which are included in the
 * reservation if theyy are reserved or not.
 */
const requireOption = require("../utils/requireOption");

module.exports = function (objectrepository) {
  const ReservationModel = requireOption(objectrepository, "ReservationModel");

  return function (req, res, next) {
    // Valid data check
    var startDate = new Date(req.body.startDate);
    var endDate = new Date(req.body.endDate);

    if (startDate == "Invalid Date" || endDate == "Invalid Date") {
      return res.redirect("/reservations/new?err=Invalid-date(s)-were-given!");
    }

    if (startDate > endDate) {
      return res.redirect(
        "/reservations/new?err=Start-date-cannot-be-later-than-end-date!"
      );
    }

    ReservationModel.find(
      { date: { $gte: startDate, $lt: endDate } },
      (err, reservations) => {
        if (err) {
          return next(err);
        }

        if (reservations.length === 0) {
          return next();
        }

        return res.redirect(
          "/reservations/new?err=There-is-a-reservation-already-in-this-time-intervall!"
        );
      }
    );
  };
};
