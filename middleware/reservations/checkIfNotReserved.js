/**
 * Checks all of the dates which are included in the 
 * reservation if theyy are reserved or not.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {        

        // Query database

        var startDate = new Date(req.body.startDate);
        var endDate = new Date(req.body.endDate);

        if(startDate == "Invalid Date" || endDate == "Invalid Date") {
            return res.redirect('/reservations/new/?err=Invalid-date(s)-were-given!');
        }

        // Check logic
        if (startDate > endDate) {
            return res.redirect('/reservations/new/?err=Start-date-cannot-be-later-than-end-date!');
        }

        return next();
    };

};