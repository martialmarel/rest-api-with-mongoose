/* global request:false, expect:false */

const Account = require('../../models/account');

describe('Routes: Accounts', () => {
	beforeEach((done) => { //Before each test we empty the database
        Account.remove({}, (err) => {
			done();
		});
    });

	describe('GET /', () => {
		it('returns a empty array of Account', done => {
			request.get('/accounts')
				.expect(200)
				.end((err, res) => {
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.equal(0);
					done(err);
				});
		});
	});
});
