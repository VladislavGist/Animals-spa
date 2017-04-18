let app = require("express")();
app.listen(process.env.PORT || 8080);
let mysql = require("mysql");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
let config = require("./config.js");

let URL_PATH = (process.env.NODE_ENV === "dev") ? config.urlPaths.dev : config.urlPaths.prod;

let pool = mysql.createPool({
	connectionLimit: 2000,
	host: config.sqlDatas.host,
	user: config.sqlDatas.user,
	password: config.sqlDatas.password,
	database: config.sqlDatas.database
});

pool.getConnection((err, connection) => {
	//cards на главной
	app.get("/list-hot-adv/:city", (req, res) => {
		console.log("/list-hot-adv");
		let func = city => {
			if(city != "Все регионы") {
				return `AND city = "${city}" `;
			} else {
				return '';
			}
		};
		
		pool.query(`SELECT * FROM cards WHERE advType IN('missing', 'find', 'gift', 'buy') ${func(req.params.city)} ORDER BY(card_id) DESC LIMIT 5`, (err, results, fields) => {
			res.writeHead(200, {
				"Cache-Control": "no-store, no-cache",
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": URL_PATH,
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
				"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
			});
			res.write(JSON.stringify(results));
			res.end();
		});
	});

	//cards категорий
	app.get("/list-animals/animal_type/:animaltype/advertisement_type/:advertisementtype/city/:city", (req, res) => {
		let func = city => {
			if(city != "Все регионы") {
				return `AND city = "${city}" `;
			} else {
				return '';
			}
		};

		pool.query(`SELECT * FROM cards WHERE animalType = '${req.params.animaltype}' AND advType = '${req.params.advertisementtype}' ${func(req.params.city)} ORDER BY(card_id) DESC`, (err, results, fields) => {
			res.writeHead(200, {
				"Cache-Control": "no-store, no-cache",
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": URL_PATH,
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
				"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
			});
			res.write(JSON.stringify(results));
			res.end();
		});
	});

	//подача card
	app.post("/add-advertisement?", (req, res) => {
		console.log(`'${req.param("userId")}'`);

		pool.query(`INSERT INTO cards VALUES(
			NULL,
			'${req.param("title")}',
			'${req.param("briefDescription")}',
			'${req.param("city")}',
			'${req.param("userName")}',
			'default',
			'${req.param("phoneNumber")}',
			0,
			'${req.param("price")}',
			'/uploads/img.jpg',
			'${req.param("animalType")}',
			'${req.param("advertisementType")}',
			0,
			'${req.param("userId")}')`, (err, results, fields) => {
				res.writeHead(200, {
					"Cache-Control": "no-store, no-cache",
					"Content-Type":"application/json;charset=utf-8",
					"Access-Control-Allow-Credentials": "true",
					"Access-Control-Allow-Origin": URL_PATH,
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
					"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
				});
				if(err) {
					console.log("Ошибка подачи объявления");
					console.log(err);
				} else {
					console.log("Объявление загружено");
					res.end();
				}
		});
	});

	app.get("/updatecardviews/:cardId", (req, res) => {
		pool.query(`UPDATE cards SET views = views + 1 WHERE card_id = ${req.params.cardId}`, (err, results, fields) => {
			if(err) {
				console.log("Ошибка изменения объявления");
			} else {
				res.writeHead(200, {
					"Cache-Control": "no-store, no-cache",
					"Content-Type":"application/json;charset=utf-8",
					"Access-Control-Allow-Credentials": "true",
					"Access-Control-Allow-Origin": URL_PATH,
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
					"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
				});
				res.end();
				console.log("Объявление c id " + req.params.cardId + " успешно изменено");
			}
		});
	});
});

console.log("Listetining server." + URL_PATH);