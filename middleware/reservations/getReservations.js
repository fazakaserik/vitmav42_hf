/**
 * Gets the given reservations from database.
 */
 const requireOption = require("../utils/requireOption");

 module.exports = function (objectrepository) {

    const ReservationModel = requireOption(objectrepository, "ReservationModel")
    const UserModel = requireOption(objectrepository, "UserModel")

    return function (req, res, next) {

        // At this point the auth middleware should establish session

        ReservationModel.find({}).populate("_reserver").exec((err, reservations) => {
            if (err) {
                return next(err)
            }
            res.locals.reservations = reservations;
            return next();
        })
    };
}