/**
 * Gets user from database.
 */

 const requireOption = require("../utils/requireOption");

 module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, "UserModel")

    return function (req, res, next) {

        let userid = (typeof req.params.userid === "undefined") ? req.session._id : req.params.userid;

        UserModel.findOne({_id: userid}, (err, user) => {
            if (err || !user) {
                return next(err);
            }

            res.locals.user = user;

            return next();
        });
    };

};