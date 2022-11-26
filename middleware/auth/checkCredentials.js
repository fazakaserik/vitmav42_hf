/**
 * Checks if the login credentials are inside the database,
 * if so, creates a new session with the user,
 * then redirects to "/".
 *
 * If credentials can't be found,
 * redirects the user back to "/login",
 * with the given error message: "/login/?err=bad_credentials".
 */

const requireOption = require('../utils/requireOption');

module.exports = function (objectrepository) {
	const UserModel = requireOption(objectrepository, 'UserModel');

	return function (req, res, next) {
		let username = req.body.username;
		let password = req.body.password;

		// Check credentials from SQL
		UserModel.findOne(
			{ username: username, password: password },
			(err, user) => {
				if (err || !user) {
					return res.redirect(
						"/login/?err=This-account-doesn't-exist!"
					);
				}

				req.session._id = user._id;
				req.session.username = user.username;
				req.session.password = user.password;

				return next();
			}
		);
	};
};
