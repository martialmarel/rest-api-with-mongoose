/* eslint-disable no-undef, no-console */

const mongoose = require('mongoose');

const config = require('../config');

const { db: { host, port, name, user, password } } = config;
let connectionString = `mongodb://${host}:${port}/${name}`;
if (user && password) {
	connectionString = `mongodb://${user}:${password}@${host}:${port}/${name}`;
}
mongoose.connect(connectionString);

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
	if (process.env.NODE_ENV !== 'test') {
		console.log('Mongoose connected');
	}
});
mongoose.connection.on('error', (err) => {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
let gracefulShutdown = (msg, callback) => {
	mongoose.connection.close(() => {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};
// For nodemon restarts
process.once('SIGUSR2', () => {
	gracefulShutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// For app termination SIGINT
process.on('SIGINT', () => {
	gracefulShutdown('app termination', () => {
		process.exit(0);
	});
});
// For app termination with SIGTERM
process.on('SIGTERM', () => {
	gracefulShutdown('app termination', () => {
		process.exit(0);
	});
});
