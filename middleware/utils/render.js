/**
 * Renders the HTML content.
 */
 module.exports = function (objectrepository, view, err) {

    return function (req, res, next) {
        res.locals.err = err;
        res.render(view, res.locals);
    };

};