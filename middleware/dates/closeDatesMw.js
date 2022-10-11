/**
 * Sets the given dates to "closed" state.
 * They are unavailable to reserve.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};