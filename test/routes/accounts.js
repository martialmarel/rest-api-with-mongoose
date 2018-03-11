/* global request:false, expect:false */

describe('Routes: Accounts', () => {
	describe('GET /', () => {
		it('returns a empty array of Account', done => {
			request.get('/accounts')
				.expect(200)
				.end((err, res) => {
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.equal(0);
					console.log(res.body);
					done(err);
				});
		});
	});

	describe('GET /', () => {
		it('returns a empty array of Account', done => {
			let account = {
				name: 'Roger Rabbit',
				balance: 1337.42
			}

			request.post('/accounts')
				.send(account)
				.expect(201)
				.end((err, res) => {
					console.log(res.body);
					done(err);
				});
		});
	});
});
