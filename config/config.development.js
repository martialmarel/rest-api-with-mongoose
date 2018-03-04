const config = {
	app: {
		port: 3000,
		logger: {
			enable: true,
			format: 'dev' // combined, common, dev, short, tiny
		}
	},
	db: {
		host: 'localhost',
		port: 27017,
		name: 'edx-course-accountsdb'
	}
};

module.exports = config;
