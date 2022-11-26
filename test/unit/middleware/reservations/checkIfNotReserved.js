var expect = require('chai').expect;
var checkIfNotReserved = require('../../../../middleware/reservations/checkIfNotReserved');

describe('checkIfNotReserved middleware', function () {
	it('should return next with no error when there are no reservations from database and the dates are in valid relation and format', function (done) {
		const mw = checkIfNotReserved(
			(objectrespository = {
				ReservationModel: {
					find: function (query_params, callback) {
						callback(undefined, []);
					},
				},
			})
		);

		mw(
			{
				body: {
					startDate: '2023-02-04',
					endDate: '2023-04-02',
				},
			},
			{
				redirect: function (path) {
					expect(path).to.be.eql('undefined');
					done();
				},
			},
			(err) => {
				expect(err).to.be.eql(undefined);
				done();
			}
		);
	});
	it('should redirect with specific error message when one of the dates are in invalid format', function (done) {
		const mw = checkIfNotReserved(
			(objectrespository = {
				ReservationModel: {
					find: function (query_params, callback) {
						callback(undefined, []);
					},
				},
			})
		);

		mw(
			{
				body: {
					startDate: 'invalid-date-format',
					endDate: '2023-04-02',
				},
			},
			{
				redirect: function (path) {
					expect(path).to.be.eql(
						'/reservations/new?err=Invalid-date(s)-were-given!'
					);
					done();
				},
			},
			(err) => {
				expect(err).not.to.be.eql(undefined);
				done();
			}
		);
	});
	it('should redirect with specific error message when one of the dates are in invalid relation', function (done) {
		const mw = checkIfNotReserved(
			(objectrespository = {
				ReservationModel: {
					find: function (query_params, callback) {
						callback(undefined, []);
					},
				},
			})
		);

		mw(
			{
				body: {
					startDate: '2023-04-02',
					endDate: '2023-04-01',
				},
			},
			{
				redirect: function (path) {
					expect(path).to.be.eql(
						'/reservations/new?err=Start-date-cannot-be-later-than-end-date!'
					);
					done();
				},
			},
			(err) => {
				expect(err).not.to.be.eql(undefined);
				done();
			}
		);
	});
	it('should return next with error when there are errors with reading from the database', function (done) {
		const mw = checkIfNotReserved(
			(objectrespository = {
				ReservationModel: {
					find: function (query_params, callback) {
						callback('Dummy error', undefined);
					},
				},
			})
		);

		mw(
			{
				body: {
					startDate: '2023-02-04',
					endDate: '2023-04-02',
				},
			},
			{
				redirect: function (path) {
					expect(path).to.be.eql('undefined');
					done();
				},
			},
			(err) => {
				expect(err).to.be.eql('Dummy error');
				done();
			}
		);
	});
	it('should redirect with specific error message when there are reservations already from database between the dates', function (done) {
		const mw = checkIfNotReserved(
			(objectrespository = {
				ReservationModel: {
					find: function (query_params, callback) {
						callback(undefined, ['reservation']);
					},
				},
			})
		);

		mw(
			{
				body: {
					startDate: '2023-02-04',
					endDate: '2023-04-02',
				},
			},
			{
				redirect: function (path) {
					expect(path).to.be.eql(
						'/reservations/new?err=There-is-a-reservation-already-in-this-time-intervall!'
					);
					done();
				},
			},
			(err) => {
				expect(err).not.to.be.eql(undefined);
				done();
			}
		);
	});
});
