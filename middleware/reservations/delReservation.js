/**
 * Deletes the given reservation from database.
 */
const requireOption = require("../utils/requireOption");

module.exports = function (objectrepository) {
  const ReservationModel = requireOption(objectrepository, "ReservationModel");

  return function (req, res, next) {
    ReservationModel.findByIdAndRemove(req.body._id, (err, date) => {
      if (err) {
        return next(err);
      }

      return next();
    });
  };
};
