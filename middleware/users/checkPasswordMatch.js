/**
 * Checks if the "Password" and the "Repeat Password"
 * fields match.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {

        var password = req.body.password;
        var passwordAgain = req.body.passwordAgain;

        if(password !== passwordAgain) {
            return res.redirect(req.session.prev_url+"/?err=Passwords-doesn\'t-match!");
        }

        return next();
    };

};