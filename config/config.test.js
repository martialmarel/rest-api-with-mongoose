const config = {
	app: {
		port: 3001,
		logger: {
			enable: false,
			format: 'tiny' // combined, common, dev, short, tiny
		}
	},
	db: {
		host: 'localhost',
		port: 27017,
		name: 'edx-course-accountsdb_test'
	}
};

module.exports = config;
