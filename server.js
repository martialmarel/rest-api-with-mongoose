'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const stackTrace = require('stack-trace');
const errorhandler = require('errorhandler');

const config = require('./config');
const uptimeHelper = require('./helpers/uptime');

require('./models/db');
uptimeHelper.init();

const port = process.env.PORT || config.app.port;

const app = express();
app.use(bodyParser.json());
app.use(logger(config.app.logger.format));
app.use(errorhandler());

const routes = require('./routes');
app.use(routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/*** error handlers ***/

// Catch unauthorised errors
app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401);
		res.json({ 'message': err.name + ': ' + err.message });
	}
	next(err);
});

// Error handler
app.use((err, req, res) => {
	const trace = stackTrace.parse(err);

	let errorResponse = {
		message: err.message,
		status: err.status,
		stack: trace
	};

	// no stacktraces leaked to user in  production only providing error in development
	const finalResponse = req.app.get('env') === 'development' ? errorResponse : {};

	console.error(finalResponse.message); // eslint-disable-line no-console

	res.status(err.status || 500)
		.json(finalResponse);
});


app.listen(port, () => {
	console.log(`Express server listening on port ${port}`); // eslint-disable-line
});

module.exports = app;
