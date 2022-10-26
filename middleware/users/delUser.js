/**
 * Deletes user from database.
 */
 const requireOption = require("../utils/requireOption");

 module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, "UserModel")

    return function (req, res, next) {

        // At this point the auth middleware should establish session

        UserModel.findByIdAndRemove(req.params.userid, (err, date) => {
            if (err) {
                return next(err);
            }

            return next();
        });
    };
}