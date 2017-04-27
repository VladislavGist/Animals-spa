let express = require("express");
let app = express();
let port = process.env.PORT || 8080;
app.listen(port);

//конфиг и пути к файлам в разных сборках
let config = require("./config.js");
let URL_PATH = process.env.NODE_ENV === "dev" ? config.urlPaths.dev : config.urlPaths.prod;
let URL_SERVER_PATH = process.env.NODE_ENV === "dev" ? config.urlServerPath.dev : config.urlServerPath.prod;

let _ = require("underscore");

app.use(express.static(__dirname + '/uploads'));
// app.use(express.static(__dirname + "../public/index.html"));

//bode parser
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//работа с изображениями
var multer = require("multer");
let imgPath = [];
let imgName = [];
let mass;
let massZip;
let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let animalType = req.originalUrl.split("/")[4];
		let advertisementType = req.originalUrl.split("/")[6];

		if(file.mimetype !== "image/jpeg") {
			console.log("Не верный формат файла");
			console.log(file.mimetype);
		} else {
			cb(null, "uploads/" + animalType + "/" + advertisementType);
			imgPath.push(URL_SERVER_PATH + "/" + animalType + "/" + advertisementType);
		}
	},
	filename: (req, file, cb) => {
		let animalType = req.originalUrl.split("/")[4];
		let advertisementType = req.originalUrl.split("/")[6];
		let dateNow = Date.now();

		if(file.mimetype !== "image/jpeg") {
			console.log("Не верный формат файла");
			console.log(file.mimetype);
		} else {
			cb(null, animalType + "-" + advertisementType + "-" + dateNow);
			imgName.push("/" + animalType + "-" + advertisementType + "-" + dateNow);
		}
	}
});
let upload = multer({storage: storage});

//подключение к базе
let mysql = require("mysql");

let pool = mysql.createPool({
	connectionLimit: 2000,
	host: config.sqlDatas.host,
	user: config.sqlDatas.user,
	password: config.sqlDatas.password,
	database: config.sqlDatas.database
});

//работа с базой данных
pool.getConnection((err, connection) => {

	//вход
	app.post("/login", (req, res) => {
		/*
			клиент отправляет логин и пароль на сервер(POST) -
			серер проверяет логин и пароль и создает сессию
			сервер уст. куку содержащую ключ сессии
			сервер делает редирект(302) на целевую страницу
		*/
		//данные входа
		let name = req.param("user"), password = req.param("password");

		//проверка логина и пароля в базе и создание сессии

		//установка куки
		res.cookie("name", "Bill", {path: "/personalArea"});

		//чтение куки
		console.log(req.cookies);

		res.send(`<p>${name} ${password}</p>`);
		res.end();
	});

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
	app.get("/list-animals/animal_type/:animaltype/advertisement_type/:advertisementtype/city/:city/count/:count", (req, res) => {
		let func = city => {
			if(city != "Все регионы") {
				return `AND city = "${city}" `;
			} else {
				return '';
			}
		};

		pool.query(`SELECT * FROM cards WHERE animalType = '${req.params.animaltype}' AND advType = '${req.params.advertisementtype}' ${func(req.params.city)} ORDER BY(card_id) DESC LIMIT ${req.params.count}`, (err, results, fields) => {
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

	//скрытие кнопки
	app.get("/list-animals/animal_type/:animaltype/advertisement_type/:advertisementtype/city/:city/count/:count/allcount", (req, res) => {
		let func = city => {
			if(city != "Все регионы") {
				return `AND city = "${city}" `;
			} else {
				return '';
			}
		};

		pool.query(`SELECT COUNT(card_id) FROM cards WHERE animalType = '${req.params.animaltype}' AND advType = '${req.params.advertisementtype}' ${func(req.params.city)} ORDER BY(card_id) DESC LIMIT ${req.params.count}`, (err, results, fields) => {
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
			'${massZip}',
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
					massZip = null;
					mass = null;
					imgPath = [];
					imgName = [];
					res.end();
				}
		});
	});

	//img
	app.post("/add-advertisement/img/animalType/:animalType/advertisementType/:advertisementType", upload.array("photo"), (req, res) => {
		res.writeHead(200, {
			"Cache-Control": "no-store, no-cache",
			"Content-Type":"multipart/form-data",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": URL_PATH,
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
			"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
		});
		mass = _.zip(imgPath, imgName);
		massZip = mass.join(" ").replace(/,/g, "");
		res.end();
	});

	//счетчик просмотров card
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

console.log("Listetining server. Port " + port);