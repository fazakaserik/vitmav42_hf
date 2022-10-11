/**
 * Ends the current session.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};