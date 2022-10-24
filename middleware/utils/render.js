/**
 * Renders the HTML content.
 */
 module.exports = function (objectrepository, view) {

    return function (req, res) {
        res.locals.session_user = {
            _id: req.session._id,
            username: req.session.username,
            password: req.session.password
        }
        res.render(view, req.query);
    };

};