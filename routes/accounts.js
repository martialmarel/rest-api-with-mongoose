'use strict';

const express = require('express');
const mongoose = require('mongoose');

const accountRouter = express.Router();
const Account = require('../models/account');

accountRouter.get('/', (req, res) => {
	Account.find((err, accounts) => {
		if (err) { throw(err); }

		return res.status(200).json(accounts);
	});
});

accountRouter.get('/:id', (req, res) => {
	let accountId = req.params.id;

	handleInvalidID(accountId);
	Account.findById(accountId, (err, account) => {
		if (err) { throw(err); }

		if (isAccountExist(account)) {
			res.json(account);
		} else {
			res.sendStatus(404);
		}
	});
});

accountRouter.post('/', (req, res) => {
	let account = new Account(req.body);

	let errorsValidation = account.validateSync();
	if ( errorsValidation ) {
		return res.status(412).send({ errors: errorsValidation.errors });
	}

	account.save((err, result) => {
		if (err) { throw(err); }

		return res.status(201).send(result);
	});
});

accountRouter.put('/:id', (req, res) => {
	let accountId = req.params.id;
	handleInvalidID(accountId);

	let balance = parseFloat(req.body.balance);
	if (typeof balance !== 'number' || isNaN(balance)) {
		return res.status(412).send({ errors: {balance : { message: 'Balance is required and and must be a number'} } });
	}

	Account.findByIdAndUpdate(accountId, { balance : balance }, { new: true},  (err, account) => {
		if (err) { throw(err); }

		if (isAccountExist(account)) {
			res.status(202).send(account);
		} else {
			res.sendStatus(404);
		}
	});
});

accountRouter.delete('/:id', (req, res) => {
	let accountId = req.params.id;
	handleInvalidID(accountId);

	Account.findByIdAndRemove(accountId, (err, account) => {
		if (err) { throw(err); }

		if (isAccountExist(account)) {
			res.status(204).send();
		} else {
			res.sendStatus(404);
		}
	});
});

function handleInvalidID(id) { // TODO create middleware for global project ???
	if (!mongoose.Types.ObjectId.isValid(id)) {
		let err = new Error(`Invalid Object ID : ${id}`);
		err.status = 412;
		err.publicData = { errors: {id : { message: '`Invalid Object ID : ${id}`'} } };

		throw(err);
	}
}

function isAccountExist(account) {
	if (account === null || typeof account == 'undefined') {
		return false;
	} else {
		return true;
	}
}

module.exports = accountRouter;
