/**
 * Directs the user to a given URL.
 */
module.exports = function (objectrepository, view) {
  return function (req, res, next) {
    return res.redirect("/" + view);
  };
};
