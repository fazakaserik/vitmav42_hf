/**
 * Check if a session is available.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};