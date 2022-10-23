/**
 * Directs the user to a given URL.
 */
 module.exports = function (objectrepository, view) {

    return function (req, res, next) {
        /*if (typeof req.session.userid === 'undefined') {
            return res.redirect('/login');
        } else {
            return res.redirect('/news');
        }*/
        return res.redirect('/'+view);
    };

};