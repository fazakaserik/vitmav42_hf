/**
 * Saves (creates or edits) the given reservation.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {

        // Save to database

        var userid = req.session._id;
        return res.redirect('/reservations/user/'+userid);
    };

};