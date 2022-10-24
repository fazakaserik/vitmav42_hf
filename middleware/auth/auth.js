/**
 * Check if a session is available.
 * If admin arguments is given, check for admin rights.
 */
 module.exports = function (objectrepository, permission) {

    return function (req, res, next) {

        if (typeof req.session._id === 'undefined') {
            return res.redirect('/login');
        }

        if(typeof permission !== "undefined"){
            if(permission === "admin"){
                // Query if user is admin
                if(req.session.username !== "admin" || req.session.password !== "admin"){
                    return res.redirect('/news');
                }
            }
        }

        res.locals.session_user = {
            _id: req.session._id,
            username: req.session.username,
            password: req.session.password
        };

        return next();

    };

};