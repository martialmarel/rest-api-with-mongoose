'use strict';

const express = require('express');
const uptimeHelper = require('./../helpers/uptime');

const router = express.Router();

// Homeroot displayed current time and startup application time
router.get('/', (req, res) => {
	res.status(200).json(uptimeHelper.getData());
});

router.get('/mma', (req, res, err) => {
	res.statusCode = err ? 500 : 404
	res.end(err ? 'Critical: ' + err.stack : 'oops')
});

module.exports = router;
