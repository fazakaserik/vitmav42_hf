var expect = require('chai').expect;
var getReservation = require('../../../../middleware/reservations/getReservation');

describe('getReservation middleware ', function () {
	it('should return res.locals.reservation with the reservation object from database', function (done) {
		const mw = getReservation(
			(objectrespository = {
				ReservationModel: {
					findOne: (param1, callback) => {
						expect(param1).to.be.eql({ _id: 42 });
						callback(null, new Date('2016-05-18T16:00:00Z'));
					},
				},
			})
		);

		const resMock = {
			locals: {
				reservation: new Date('2016-05-18T16:00:00Z'),
			},
		};

		mw(
			{
				body: {
					_id: 42,
				},
			},
			resMock,
			(err) => {
				expect(err).to.be.eql(undefined);
				expect(resMock.locals).to.be.eql({
					reservation: new Date('2016-05-18T16:00:00Z'),
				});
				done();
			}
		);
	});
	it('should call next with error when there is a db problem', function (done) {
		const mw = getReservation(
			(objectrespository = {
				ReservationModel: {
					findOne: (param1, callback) => {
						expect(param1).to.be.eql({ _id: 42 });
						callback('dummy error message', null);
					},
				},
			})
		);

		const resMock = {
			locals: {},
		};

		mw(
			{
				body: {
					_id: 42,
				},
			},
			resMock,
			(err) => {
				expect(err).to.be.eql('dummy error message');
				expect(resMock.locals).to.be.eql({});
				done();
			}
		);
	});
});
