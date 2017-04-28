let express = require("express");
let app = express();
let port = process.env.PORT || 8080;

//modules
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let jwt = require("jsonwebtoken");
let expressJwt = require("express-jwt");

//конфиг и пути к файлам в разных сборках
let config = require("./config.js");
const secret = config.secret;
let URL_PATH = process.env.NODE_ENV === "dev" ? config.urlPaths.dev : config.urlPaths.prod;
let URL_SERVER_PATH = process.env.NODE_ENV === "dev" ? config.urlServerPath.dev : config.urlServerPath.prod;

let _ = require("underscore");

app.use(express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
	res.sendFile(__dirname + "/public");
});

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
	if(err) {
		console.log(err);
	} else {
		//регистрация
		app.post("/registr", (req, res) => {
			//сделать проверку пришедших данных. не sql ли они
			//у номера телефона убрать пробелы

			//получает от пользователя: имя, телефон, пароль, город, емейл
			let reqData = {
				"name": req.param("name"),
				"surname": req.param("surname"),
				"phone": req.param("phone").replace(/\s/g, ""),
				"password": req.param("password"),
				"city": req.param("city"),
				"email": req.param("email").replace(/\s/g, "")
			};

			//проверяем нет ли пользователям с таким же номером телефона
			pool.query(`SELECT COUNT(phoneNumber) FROM users WHERE phoneNumber='${reqData["phone"]}';`, (err, results, fields) => {
				if(err) {
					res.json({error: "Ошибка ответа от базы данных"});

				} else if(results[0]['COUNT(phoneNumber)'] > 0) {		//проверяем нет ли пользователям с таким же номером телефона
					res.json({message: "Пользователь с таким номером телефона уже существует"});	

				} else {
					//регистрируем нового пользователя
					pool.query(`INSERT INTO users VALUES(NULL, '${reqData["name"]}', '${reqData["surname"]}', '${reqData["phone"]}', '${reqData["city"]}', '${reqData["password"]}', 'default');`, (err, results, fields) => {
						if(err) {
							req.json("Ошибка при регистрации нового пользователя");

						} else {
							//подписываем данные с ключем. отправляем клиенту данные
							// token: jwt.sign(reqData, secret) - не понятно зачем нужен jwt
							return res.json({
								"name": reqData["name"],
								"surname": reqData["surname"],
								"phone": reqData["phone"],
								"city": reqData["city"],
								"email": reqData["email"]
							});
						}
					});
				}
			});
		});

		//аунтификация. вход в приложение
		app.get("/protected",
			(req, res) => {
				// expressJwt({secret})
				let password = req.query.password, phone = req.query.phone.replace(/\s/g, "");

				//идем в базу ищем такого-то пользователя с таким-то паролем
				pool.query(`SELECT COUNT(password) FROM users WHERE password='${password}';`, (err, results, fields) => {
					//если пользователь с таким именем и паролем найден кладем данные в свойства объекта
					if(err) {
						res.json({error: "Ошибка при проверке пароля"});
					} else {
						if(results[0]['COUNT(password)'] > 0) {
							pool.query(`SELECT COUNT(phoneNumber) FROM users WHERE phoneNumber='${phone}' `, (err, results, fields) => {
								if(err) {
									res.json({error: "Ошибка при проверке номера телефона"});
								} else {
									if(results[0]['COUNT(phoneNumber)'] > 0) {
										pool.query(`SELECT user_id, name, surname, phoneNumber, city, accountType FROM users WHERE password='${password}' AND phoneNumber='${phone}'`, (err, results, fields) => {
											if(err) {
												res.json({error: "Ошибка при получении данных пользователя"});
											} else {
												if(results.length !== 0) {
													res.json(results);
												} else {
													res.json({message: "Не верные данные или пользователь не существует"});
												}
											}
										});
									} else {
										res.json({message: "Не верные данные или пользователь не существует"});
									}
								}
							});
						} else {
							res.json({message: "Не верные данные или пользователь не существует"});
						}
					}
				});
			}
		);

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
					"Content-Type":"application/json",
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
			//сделать проверку на sql атаку

			pool.query(`INSERT INTO cards VALUES(
				NULL,
				'${req.param("title")}',
				'${req.param("briefDescription")}',
				'${req.param("city")}',
				'${req.param("userName")}',
				'default',
				'${req.param("phoneNumber").replace(/\s/g, "")}',
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
	}

});

app.listen(port, () => {
	console.log("Listetining server. Port " + port + " " + URL_PATH);
});