/**
 * Gets the given reservation from database.
 * 
 * TODO: actually this might be useless... We get all dates from the getReservations.js
 */
 const requireOption = require("../utils/requireOption");

 module.exports = function (objectrepository) {

    const ReservationModel = requireOption(objectrepository, "ReservationModel")

    return function (req, res, next) {

        // At this point the auth middleware should establish session

        ReservationModel.findOne({_id: req.body._id}, (err, date) => {
            if (err || !date) {
                return next(err);
            }

            res.locals.reservation = date;

            return next();
        });
    };
}