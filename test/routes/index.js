/* global request:false, expect:false */

describe('Routes: Index', () => {
	describe('GET /', () => {
		it('returns the API status', done => {
			request.get('/')
				.expect(200)
				.end((err, res) => {

					const nowExpected = (new Date().toISOString()).split('.')[0];
					expect(res.body).to.have.property('now');
					expect(res.body).to.have.property('uptime');
					expect(res.body.now).to.string(nowExpected);
					done(err);
				});
		});
	});
});
