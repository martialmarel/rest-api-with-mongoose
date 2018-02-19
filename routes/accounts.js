'use strict';

const express = require('express');
const accountRouter = express.Router();

accountRouter.get('/', (req, res) => {
	return res.status(200).send('GET /accounts');
});

accountRouter.post('/', (req, res) => {
	return res.status(201).send('POST /accounts');
});

accountRouter.put('/:id', (req, res) => {
	let accountId = req.params.id;
	return res.status(204).send('PUT /accounts' + accountId);
});

accountRouter.delete('/:id', (req, res) => {
	let accountId = req.params.id;
	return res.status(204).send('DELETE /accounts' + accountId);
});

module.exports = accountRouter;
