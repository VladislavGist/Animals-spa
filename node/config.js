let config;
module.exports = config = {
	port: {
		dev: 8080,
		prod: 80
	},
	urlPaths: {
		dev: "http://localhost:8090",
		prod: "http://oblako.pet"
	},
	urlServerPath: {
		dev: "http://localhost:8080",
		prod: "http://oblako.pet"
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