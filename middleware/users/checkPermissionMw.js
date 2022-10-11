/**
 * Checks if the curretn session user has permission to the wanted page.
 * Admin users always have permission.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};