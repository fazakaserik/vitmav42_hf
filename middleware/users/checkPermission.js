/**
 * Checks if the curretn session user has permission to the wanted page.
 * Admin users always have permission.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {

        // If admin or the owner of the reservation
        if(req.session.username !== "admin" || req.session.password !== "admin"){
            return res.redirect('/reservations/all');
        }

        return next();
    };

};