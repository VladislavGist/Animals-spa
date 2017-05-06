let config;
module.exports = config  = {
	port: {
		dev: 8080,
		prod: 80
	},
	urlPaths: {
		dev: "http://localhost:8090",
		prod: "http://198.211.121.46:8080"
	},
	urlServerPath: {
		dev: "http://localhost:8080",
		prod: "http://198.211.121.46:8080"
	},
	sqlDatasDev: {
		host: "localhost",
		user: "root",
		password: "root",
		database: "animals_db"
	},
	sqlDatasProd: {
		host: "localhost",
		user: "root",
		password: "bmw1forme",
		database: "animalsDataBase"
	},
	secret: "dradnout"
};