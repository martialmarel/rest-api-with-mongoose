/* global request:false, expect:false */

const Account = require('../../models/account');

describe('Routes: Accounts', () => {
	beforeEach((done) => { //Before each test we empty the database
		Account.remove({}, (err) => {
			done(err);
		});
	});

	describe('GET /', () => {
		it('Fist call return a empty array of Account', done => {
			request.get('/accounts')
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.equal(0);
					done(err);
				});
		});
	});

	describe('POST /', () => {
		it('it should not POST a Account without name field', done => {
			let account = {
				balance: 1337.42
			};

			request.post('/accounts')
				.send(account)
				.end((err, res) => {
					expect(res.status).to.equal(412);
					expect(res.body).to.be.a('object');
					expect(res.body).to.be.have.property('errors');
					expect(res.body.errors).to.be.have.property('name');
					done(err);
				});
		});

		it('it should not POST a Account with name field length inferior to 2 characters', done => {
			let account = {
				name: 'a',
				balance: 1337.42
			};

			request.post('/accounts')
				.send(account)
				.end((err, res) => {
					expect(res.status).to.equal(412);
					expect(res.body).to.be.a('object');
					expect(res.body).to.be.have.property('errors');
					expect(res.body.errors).to.be.have.property('name');
					done(err);
				});
		});

		it('it should POST a Account', (done) => {
			let account = {
				name: 'Roger Rabbit',
				balance: 1337.42
			};

			request.post('/accounts')
				.send(account)
				.end((err, res) => {
					expect(res.status).to.equal(201);
					expect(res.body).to.be.a('object');
					expect(res.body).to.be.have.property('_id');
					expect(res.body).to.be.have.property('name');
					expect(res.body).to.be.have.property('balance');
					expect(res.body.name).to.equal(account.name);
					expect(res.body.balance).to.equal(account.balance);


					done(err);
				});




		});

		it('it should POST a Account and name is trimed.', (done) => {
			let account = {
				name: ' Daffy Duck ',
				balance: 76
			};

			request.post('/accounts')
				.send(account)
				.end((err, res) => {
					expect(res.status).to.equal(201);
					expect(res.body).to.be.a('object');
					expect(res.body).to.be.have.property('_id');
					expect(res.body).to.be.have.property('name');
					expect(res.body).to.be.have.property('balance');
					expect(res.body.name).to.equal(account.name.trim());
					expect(res.body.balance).to.equal(account.balance);
					done(err);
				});
		});

		it('it should POST a many Account and call GET / return an array of accounts', (done) => {
			let accounts = [
				{
					name: 'Roger Rabbit',
					balance: 1337.42
				},
				{
					name: ' Daffy Duck ',
					balance: 76
				},
				{
					name: 'Bug Bunny',
					balance: 85.35
				},
				{
					name: 'Porky Pig',
					balance: 45.67
				},
				{
					name: 'Speedy Gonzalez',
					balance: 49.653
				}
			];

			for (let account of accounts) {
				request.post('/accounts')
					.send(account)
					.end((err, res) => {
						expect(res.status).to.equal(201);
						expect(res.body).to.be.a('object');
						expect(res.body).to.be.have.property('_id');
						expect(res.body).to.be.have.property('name');
						expect(res.body).to.be.have.property('balance');
						expect(res.body.name).to.equal(account.name.trim());
						expect(res.body.balance).to.equal(account.balance);
					});
			}

			setTimeout(() => { // eslint-disable-line no-undef
				request.get('/accounts')
					.end((err, res) => {
						expect(res.status).to.equal(200);
						expect(res.body).to.be.an('array');
						expect(res.body.length).to.equal(accounts.length);
						done(err);
					});
			}, 50);
		});
	});

	describe('/GET/:id', () => {
		it('it should GET a account by the given id', (done) => {
			let account = new Account({
				name: 'Roger Rabbit',
				balance: 1337.42
			});

			account.save((err, account) => {
				request.get(`/accounts/${account.id}`)
					.end((err, res) => {
						expect(res.status).to.equal(200);
						expect(res.body).to.be.an('object');
						expect(res.body).to.be.have.property('_id').to.equal(account.id);
						expect(res.body).to.be.have.property('name').to.equal(account.name.trim());
						expect(res.body).to.be.have.property('balance').to.equal(account.balance);
						done(err);
					});
			});

		});

		it('it should not GET a account for the dont exist id', (done) => {
			let accountId = '5aa522b99bd328233667b1fe';

			request.get(`/accounts/${accountId}`)
				.end((err, res) => {
					expect(res.status).to.equal(404);
					expect(res.body).to.be.an('object').to.eql({});
					done(err);
				});
		});

		it('it should not GET a account for invalid id', (done) => {
			let accountId = '89';

			request.get(`/accounts/${accountId}`)
				.end((err, res) => {
					expect(res.status).to.equal(412);
					expect(res.body).to.be.an('object');
					expect(res.body).to.be.have.property('errors');
					expect(res.body.errors).to.be.have.property('id');
					done(err);
				});
		});
	});

	describe('/PUT/:id', () => {
		it('it should UPDATE a balance for account given the id', (done) => {
			let account = new Account({
				name: 'Roger Rabbit',
				balance: 1337.42
			});

			account.save((err, account) => {
				const updateBalance = 71.35;

				request.put(`/accounts/${account.id}`)
					.send({ balance: updateBalance })
					.end((err, res) => {
						expect(res.status).to.equal(202);
						expect(res.body).to.be.an('object');
						expect(res.body).to.be.have.property('name');
						expect(res.body).to.be.have.property('balance').to.equal(updateBalance);
						done(err);
					});
			});
		});

		it('it should not UPDATE account given the id without data balance', (done) => {
			let account = new Account({
				name: 'Roger Rabbit',
				balance: 1337.42
			});

			account.save((err, account) => {
				request.put(`/accounts/${account.id}`)
					.send()
					.end((err, res) => {
						expect(res.status).to.equal(412);
						expect(res.body).to.be.an('object');
						expect(res.body).to.be.have.property('errors');
						done(err);
					});
			});
		});

		it('it should UPDATE account given the id without change the name field', (done) => {
			let account = new Account({
				name: 'Roger Rabbit',
				balance: 1337.42
			});

			account.save((err, account) => {
				const updateName = 'Daffy duck';
				const updateBalance = 71.35;

				request.put(`/accounts/${account.id}`)
					.send({
						name: updateName,
						balance: updateBalance
					})
					.end((err, res) => {
						expect(res.status).to.equal(202);
						expect(res.body).to.be.an('object');
						expect(res.body).to.be.have.property('name').to.not.equal(updateName);
						expect(res.body).to.be.have.property('balance').to.equal(updateBalance);
						done(err);
					});
			});
		});
	});

	describe('/DELETE/:id', () => {
		it('it should DELETE a account given the id', (done) => {
			let account = new Account({
				name: 'Roger Rabbit',
				balance: 1337.42
			});
			account.save((err, account) => {
				request.delete(`/accounts/${account.id}`)
					.end((err, res) => {
						expect(res.status).to.equal(204);
						expect(res.body).to.be.an('object').to.eql({});
						done(err);
					});
			});
		});
	});
});
