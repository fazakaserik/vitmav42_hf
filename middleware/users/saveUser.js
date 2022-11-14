/**
 * Saves (create or edit) user.
 */
 const requireOption = require("../utils/requireOption");

 module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, "UserModel")

    return function (req, res, next) {

        if (typeof req.body._id === "undefined") {
            // New user
            let user = new UserModel();
            user.first_name = req.body.firstName;
            user.last_name = req.body.lastName;
            user.email = req.body.email;
            user.tel = req.body.tel;
            user.username = req.body.username;
            user.password = req.body.password;
            user.save((err)=>{
                return next(err);
            });
            return next();
        } else {
            // Save user
            UserModel.findByIdAndUpdate(req.body._id, 
                {
                    $set: {
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        email: req.body.email,
                        tel: req.body.tel,
                        password: req.body.password
                    }
                },
                (err) => {
                if (err) {
                    return next(err);
                }
    
                return next();
            });
        }
    };
}