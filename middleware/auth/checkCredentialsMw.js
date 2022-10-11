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
        return next();
    };

};