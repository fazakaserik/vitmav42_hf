/**
 * Gets the given user's reservation from database.
 */

const requireOption = require("../utils/requireOption");

module.exports = function (objectrepository) {
  const ReservationModel = requireOption(objectrepository, "ReservationModel");

  return function (req, res, next) {
    // At this point the auth middleware should establish session

    let userid =
      req.params.userid === undefined ? req.session._id : req.params.userid;

    ReservationModel.find({ _reserver: userid })
      .populate("_reserver")
      .exec((err, reservations) => {
        if (err || !reservations) {
          return next(err);
        }

        res.locals.reservations = reservations;

        return next();
      });
  };
};
