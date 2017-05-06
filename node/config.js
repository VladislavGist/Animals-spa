let config;
module.exports = config  = {
	urlPaths: {
		dev: "http://localhost:8090",
		prod: "http://198.211.121.46:8090"
	},
	urlServerPath: {
		dev: "http://localhost:8080",
		prod: "http://198.211.121.46"
	},
	sqlDatas: {
		host: "localhost",
		user: "root",
		password: "root",
		database: "animals_db"
	},
	secret: "dradnout"
};