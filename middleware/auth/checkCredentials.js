/**
 * Checks if the login credentials are inside the database, 
 * if so, creates a new session with the user,
 * then redirects to "/".
 * 
 * If credentials can't be found,
 * redirects the user back to "/login",
 * with the given error message: "/login/?err=bad_credentials".
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        var username = req.body.username;
        var password = req.body.password;

        // Check credentials from SQL
        req.session._id = 42;
        req.session.username = username;
        req.session.password = password;

        if(typeof req.session._id === "undefined" || req.session._id === "") {
            return res.redirect('/login/?err=User-identifier-missing!');
        }
        if(typeof req.session.username === "undefined" || req.session.username === "") {
            return res.redirect('/login/?err=Username-missing!');
        }
        if(typeof req.session.password === "undefined" || req.session.password === "") {
            return res.redirect('/login/?err=Password-missing!');
        }

        return next();

    };

};