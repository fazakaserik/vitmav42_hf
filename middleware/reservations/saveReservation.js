/**
 * Saves (creates or edits) the given reservation.
 */
const requireOption = require('../utils/requireOption');

module.exports = function (objectrepository) {
	const ReservationModel = requireOption(
		objectrepository,
		'ReservationModel'
	);

	return function (req, res, next) {
		// Create an array of reservations in the given intervall
		let currentDate = new Date(req.body.startDate);
		let endDate = new Date(req.body.endDate);

		while (currentDate <= endDate) {
			// Save the current reservation
			let reservation = new ReservationModel();
			reservation.date = currentDate;
			reservation.name = req.body.name;
			reservation._reserver = res.locals.user;
			let error = undefined;
			reservation.save((err) => {
				if (err) {
					error = err;
				}
			});
			// This resolves the async save error handling
			if (typeof error !== undefined) {
				return next(error);
			}

			// Add one day to the current
			let nextDate = new Date(currentDate.valueOf());
			nextDate.setDate(nextDate.getDate() + 1);
			currentDate = nextDate;
		}

		return next();
	};
};
