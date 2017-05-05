let config;
module.exports = config  = {
	urlPaths: {
		dev: "http://localhost:8090",
		prod: "https://vladislavgist.github.io"
	},
	urlServerPath: {
		dev: "http://localhost:8080",
		prod: "http://localhost:8080"
	},
	sqlDatas: {
		host: "localhost",
		user: "root",
		password: "root",
		database: "animals_db"
	},
	secret: "dradnout"
};