/**
 * Creates date records according to the given interval.
 */
 module.exports = function (objectrepository) {

    return function (req, res) {
        // Query database
        var startDate = new Date(req.body.startDate);
        var endDate = new Date(req.body.endDate);

        if(startDate == "Invalid Date" || endDate == "Invalid Date") {
            return res.redirect('/administration/?err=Invalid-date(s)-were-given!');
        }

        // Check logic
        if (startDate > endDate) {
            return res.redirect('/administration/?err=Start-date-cannot-be-later-than-end-date!');
        }

        if (typeof req.body.open !== "undefined") {
            return res.redirect('/administration/?succ=Opened-dates-from-'+ startDate +'-to-' + endDate + '!');
        }
        if (typeof req.body.close !== "undefined") {
            return res.redirect('/administration/?succ=Closed-dates-from-'+ startDate +'-to-' + endDate + '!');
        }

        return next();
    };

};