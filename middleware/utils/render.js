/**
 * Renders the HTML content.
 */
module.exports = function (objectrepository, view) {
  return function (req, res) {
    res.locals.session_user = {
      _id: req.session._id,
      username: req.session.username,
      password: req.session.password,
    };
    //console.log("🚀 ~ file: render.js ~ line 8 ~ res.locals", res.locals)

    res.render(view, req.query);
  };
};
