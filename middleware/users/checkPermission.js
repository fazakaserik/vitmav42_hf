/**
 * Checks if the curretn session user has permission to the wanted page.
 * Admin users always have permission.
 */
 const requireOption = require("../utils/requireOption");

 module.exports = function (objectrepository) {

    const ReservationModel = requireOption(objectrepository, "ReservationModel")

    return function (req, res, next) {

        // At this point the auth middleware should establish session

        ReservationModel.findOne({_id: req.params._id}, (err, date) => {
            if (err || !date) {
                return next(err);
            }

            if(req.session.username !== "admin" || req.session.password !== "admin" ||
                req.session._id !== date._reserver) {
                return res.redirect('/reservations/all');
            }

            return next();
        });
    };

    return function (req, res, next) {

        // If admin or the owner of the reservation
        if(req.session.username !== "admin" || req.session.password !== "admin" ||
        req.session._id !== req.params._id) {
            return res.redirect('/reservations/all');
        }

        return next();
    };

};