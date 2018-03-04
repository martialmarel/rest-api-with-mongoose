const config = {
	app: {
		port: 3001,
		logger: {
			format: 'dev' // combined, common, dev, short, tiny
		}
	},
	db: {
		host: 'localhost',
		port: 27017,
		name: 'edx-course-accountsdb_test'
	}
};

module.exports = config;
