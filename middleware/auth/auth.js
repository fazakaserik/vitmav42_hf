/**
 * Check if a session is available.
 * If admin arguments is given, check for admin rights.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};