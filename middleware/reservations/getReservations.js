/**
 * Gets the given reservations from database.
 */
 const requireOption = require("../utils/requireOption");

 module.exports = function (objectrepository) {

    const ReservationModel = requireOption(objectrepository, "ReservationModel")
    const UserModel = requireOption(objectrepository, "UserModel")

    return function (req, res, next) {

        // At this point the auth middleware should establish session

        ReservationModel.find({}, (err, dates) => {
            if (err || !dates) {
                return next(err);
            }

            res.locals.reservations = dates;

            res.locals.reservations.forEach(function(reservation){

                UserModel.findOne({_id: reservation._reserver}, (err, user) => {
                    if (err || !user) {
                        return next(err);
                    }

                    reservation = reservation.toJSON();

                    reservation.reserver = {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    };

                    return reservation;
                    
                });
                
            });

            return next();
        });
    };
}