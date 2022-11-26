var expect = require('chai').expect;
var saveReservation = require('../../../../middleware/reservations/saveReservation');

describe('saveReservation middleware', function () {
	it('should save the reservations to database', function (done) {
		class ReservationModel {
			save(callback) {
				callback(undefined);
			}
		}

		const mw = saveReservation(
			(objectrespository = {
				ReservationModel: ReservationModel,
			})
		);

		mw(
			{
				body: {
					name: 'Dummy reservation',
					startDate: new Date('2016-05-18T16:00:00Z'),
					endDate: new Date('2016-05-20T16:00:00Z'),
				},
			},
			{
				locals: {
					user: {
						_id: 42,
						first_name: 'Erik',
						last_name: 'Fazakas',
						email: 'erik.fazakas@kuka.com',
						tel: '+36501227369',
					},
				},
			},
			(err) => {
				expect(err).to.be.eql(undefined);
				done();
			}
		);
	});
	it('should log the error to console if it happens', function (done) {
		class ReservationModel {
			save(callback) {
				callback('Dummy error message');
			}
		}

		const mw = saveReservation(
			(objectrespository = {
				ReservationModel: ReservationModel,
			})
		);

		mw(
			{
				body: {
					name: 'Dummy reservation',
					startDate: new Date('2016-05-18T16:00:00Z'),
					endDate: new Date('2016-05-20T16:00:00Z'),
				},
			},
			{
				locals: {
					user: {
						_id: 42,
						first_name: 'Erik',
						last_name: 'Fazakas',
						email: 'erik.fazakas@kuka.com',
						tel: '+36501227369',
					},
				},
			},
			(err) => {
				expect(err).to.be.eql('Dummy error message');
				done();
			}
		);
	});
});
