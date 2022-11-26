/**
 * Checks if the "Password" and the "Repeat Password"
 * fields match.
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (req.body.password !== req.body.passwordAgain) {
      return res.redirect(
        req.body.previousPath + "?err=Passwords-doesn't-match!"
      );
    }

    if (typeof req.body.currentPassword !== "undefined") {
      if (req.body.currentPassword === "") {
        return res.redirect(
          req.body.previousPath + "?err=Enter-current-password-to-save!"
        );
      }
      if (req.body.password !== req.body.currentPassword) {
        return res.redirect(
          req.body.previousPath + "?err=Current-password-is-not-valid!"
        );
      }
    }

    return next();
  };
};
