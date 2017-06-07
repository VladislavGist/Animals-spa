let config;
module.exports = config  = {
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
		host: "",
		user: "",
		password: "",
		database: "animals_db"
	},
	sqlDatasProd: {
		host: "",
		user: "",
		password: "",
		database: "animalsDataBase"
	},
	secret: ""
};