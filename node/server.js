"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require("express-jwt");

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _reduxConnect = require("redux-connect");

var _config = require("./config.js");

var _config2 = _interopRequireDefault(_config);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//modules

require('node-jsx').install();

//ssr


// import routes from "./routes.jsx"
// import configureStore from "./redux/configureStore.jsx";

//конфиг и пути к файлам в разных сборках

var port = process.env.NODE_ENV === "dev" ? _config2.default.port.dev : _config2.default.port.prod;
var secret = _config2.default.secret;
var URL_PATH = process.env.NODE_ENV === "dev" ? _config2.default.urlPaths.dev : _config2.default.urlPaths.prod;
var URL_SERVER_PATH = process.env.NODE_ENV === "dev" ? _config2.default.urlServerPath.dev : _config2.default.urlServerPath.prod;
var DATABASE = process.env.NODE_ENV === "dev" ? _config2.default.sqlDatasDev : _config2.default.sqlDatasProd;

app.use(_express2.default.static(__dirname + '/uploads'));
app.use(_express2.default.static(__dirname + "/public"));
app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)({ origin: URL_PATH }));

var renderHtml = function renderHtml() {
	return "<!DOCTYPE html>\n\t\t<html lang=\"ru\">\n\t\t<head>\n\t\t\t<meta charset=\"UTF-8\">\n\t\t\t<title>Oblako.pet</title>\n\t\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n\t\t\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n\n\t\t\t<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"./favicons/apple-touch-icon.png\">\n\t\t\t<link rel=\"icon\" type=\"image/png\" href=\"./favicons/./favicon-32x32.png\" sizes=\"32x32\">\n\t\t\t<link rel=\"icon\" type=\"image/png\" href=\"./favicons/./favicon-16x16.png\" sizes=\"16x16\">\n\t\t\t<link rel=\"manifest\" href=\"./favicons/manifest.json\">\n\t\t\t<link rel=\"mask-icon\" href=\"./favicons/safari-pinned-tab.svg\" color=\"#5bbad5\">\n\t\t\t<meta name=\"theme-color\" content=\"#ffffff\">\n\n\t\t\t<meta content=\"SKYPE_TOOLBAR_PARSER_COMPATIBLE\" name=\"SKYPE_TOOLBAR\">\n\t\t\t<script src=\"https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js\"></script>\n\t\t\t<script src=\"https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js\"></script>\n\n\t\t\t<script src=\"https://use.fontawesome.com/d12eda1a75.js\"></script>\n\t\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css\" />\n\t\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css\" />\n\t\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"./bundle.css\" />\n\n\t\t</head>\n\t\t<body>\n\t\t\t<div id=\"app\"></div>\n\t\t\t<script src=\"./bundle.js\"></script>\n\t\t\t<script type=\"text/javascript\"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter44570849 = new Ya.Metrika({ id:44570849, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName(\"script\")[0], s = d.createElement(\"script\"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = \"text/javascript\"; s.async = true; s.src = \"https://mc.yandex.ru/metrika/watch.js\"; if (w.opera == \"[object Opera]\") { d.addEventListener(\"DOMContentLoaded\", f, false); } else { f(); } })(document, window, \"yandex_metrika_callbacks\"); </script> <noscript><div><img src=\"https://mc.yandex.ru/watch/44570849\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div>\n\t\t\t</noscript>\n\t\t</body>\n\t\t</html>\n\t";
};

app.get("*", function (req, res) {
	res.sendFile(__dirname + "/public");
	// res.send(renderHtml());
});

//обратная связь
app.get("/sendus", function (req, res) {
	var datas = {
		name: req.query.name,
		email: req.query.email,
		title: req.query.title,
		mess: req.query.mess
	};

	var transporter = _nodemailer2.default.createTransport({
		service: "gmail",
		auth: {
			user: "spanshine.vlad@gmail.com",
			pass: "dc0781907819"
		}
	});

	var mailOptions = {
		from: "Animals " + datas.email,
		to: "studio_kseven@mail.ru",
		subject: "\u0422\u0435\u043C\u0430 \u043F\u0438\u0441\u044C\u043C\u0430: " + datas.title,
		html: "<p>" + "Имя: " + datas.name + "<br/>" + "Сообщение: " + datas.mess + "<br/>" + "Моя почта: " + datas.email + "</p>"
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err);
			res.json(500, { message: "Ошибка отправки письма на почту" });
		} else {
			res.json(200, { message: "Отправлено" });
		}
	});
});

//работа с изображениями

var imgPath = [];
var imgName = [];
var mass = null;
var massZip = null;
var storage = _multer2.default.diskStorage({
	destination: function destination(req, file, cb) {
		var animalType = req.originalUrl.split("/")[4];
		var advertisementType = req.originalUrl.split("/")[6];

		if (file.mimetype !== "image/jpeg") {
			console.log("Неверный формат файла");
			console.log(file.mimetype);
		} else {
			cb(null, "uploads/" + animalType + "/" + advertisementType);
			imgPath.push(URL_SERVER_PATH + "/" + animalType + "/" + advertisementType);
		}
	},
	filename: function filename(req, file, cb) {
		var animalType = req.originalUrl.split("/")[4];
		var advertisementType = req.originalUrl.split("/")[6];
		var dateNow = Date.now();

		if (file.mimetype !== "image/jpeg") {
			console.log("Неверный формат файла");
			console.log(file.mimetype);
		} else {
			var random = Math.random(0, 10000);
			cb(null, animalType + "-" + advertisementType + "-" + dateNow + random);
			imgName.push("/" + animalType + "-" + advertisementType + "-" + dateNow + random);
		}
	}
});
var upload = (0, _multer2.default)({ storage: storage });

//подключение к базе
var mysql = require("mysql");

var pool = mysql.createPool({
	connectionLimit: 2000,
	host: DATABASE.host,
	user: DATABASE.user,
	password: DATABASE.password,
	database: DATABASE.database
});

//работа с базой данных
// pool.getConnection((err, connection) => {
// 	if(err) {
// 		console.log(err);
// 	} else {
// }
// });

//модерация объявлений. изменить статус
app.get("/replaceStatusCard", function (req, res) {
	var cardId = req.query.cardid,
	    newStatus = req.query.status;
	pool.query("UPDATE cards SET status='" + newStatus + "' WHERE card_id=" + cardId, function (err, result, fields) {
		if (err) {
			console.log("Ошибка при изменении статуса обявления");
			console.log(err);
			res.json(500, { message: "error" });
		} else {
			console.log("Статус объявления изменен");
			res.json(200, { message: "Статус объявления изменен" });
		}
	});
});

//модерация объявлений. вывести все
app.get("/moderate", function (req, res) {
	pool.query("SELECT * FROM cards WHERE status='verified'; ", function (err, results, fields) {
		if (err) {
			console.log("Ошибка при получении объявлений для модерации");
			res.end();
		} else {
			console.log("Объявления отданы");
			res.write(JSON.stringify(results));
			res.end();
		}
	});
});

//удалени объявлений
_moment2.default.locale("ru");

setInterval(function () {
	var nowTime = (0, _moment2.default)().format("LTS"),
	    nowDay = (0, _moment2.default)().format("ll");

	if (nowTime == "00:00:00" && nowTime != "00:00:05") {

		//удаление изображений на сервере
		pool.query("SELECT imgPath FROM cards WHERE data_delete='" + nowDay + "';", function (err, results, fields) {
			if (err) {
				console.log("Ошибка удаления файлов");
				console.log(err);
			} else {

				//функция поиска и удаления файлов
				var delteImages = function delteImages(firstFilder, secondFolder, name) {
					var myPath = "./uploads/" + firstFilder + "/" + secondFolder + "/" + name;
					_fs2.default.unlink(myPath, function (err) {
						if (err) {
							console.log(err);
							paths = [];
						} else {
							console.log(myPath + " удален");
							paths = [];
						}
					});
				};

				//пути в чистом виде
				var paths = [];
				for (var i = 0; i < results.length; i++) {
					paths.push(results[i].imgPath + " ");
				}
				var finalPaths = _underscore2.default.compact(paths).join("");
				//пути без хостов
				var array = _underscore2.default.compact(finalPaths.replace(/http:.{2,}?\//g, "").split(" "));
				//массив путей со слешами. убираем их
				var array2 = _underscore2.default.map(array, function (e) {
					return e.replace(/\//g, " ");
				});
				//массив путей без слешей. на каждое слово вызываем функцию удаления
				var array3 = _underscore2.default.each(array2, function (e) {
					var massStr = e.split(" ");
					console.log(massStr);
					//запуск функции поиска и удаления
					//аргумены: папка, папка, имя файла
					delteImages(massStr[0], massStr[1], massStr[2]);
				});
			}
		});

		//удаление объявлений в базе
		pool.query("DELETE FROM cards WHERE data_delete='" + nowDay + "';", function (err, results, fields) {
			if (err) {
				console.log("Ошибка удаления объявлений");
				console.log(err);
			} else {
				console.log("Объявления удалены");
			}
		});
	}
}, 1000);

//регистрация
app.post("/registr", function (req, res) {
	//получает от пользователя: имя, телефон, пароль, город, емейл
	var reqData = {
		"name": req.param("name"),
		"surname": req.param("surname"),
		"phone": req.param("phone").replace(/\s/g, ""),
		"password": req.param("password"),
		"city": req.param("city"),
		"email": req.param("email").replace(/\s/g, "")
	};

	//проверяем нет ли пользователям с таким же номером телефона
	pool.query("SELECT COUNT(phoneNumber) FROM users WHERE phoneNumber='" + reqData["phone"] + "';", function (err, results, fields) {
		if (err) {
			res.json({ error: "Ошибка ответа от базы данных" });
		} else if (results[0]['COUNT(phoneNumber)'] > 0) {
			//проверяем нет ли пользователям с таким же номером телефона
			res.json({ message: "Пользователь с таким номером телефона уже существует" });
		} else {
			//регистрируем нового пользователя
			pool.query("INSERT INTO users VALUES(NULL, '" + reqData["name"] + "', '" + reqData["surname"] + "', '" + reqData["phone"] + "', '" + reqData["city"] + "', '" + reqData["password"] + "', 'PRIVATE_SELLER', '" + reqData["email"] + "', NULL);", function (err, results, fields) {
				if (err) {
					res.json("Ошибка при регистрации нового пользователя");
				} else {
					//подписываем данные с ключем. отправляем клиенту данные
					// token: jwt.sign(reqData, secret) - не понятно зачем нужен jwt
					return res.json({
						message: "Вы успешно зарегистрированы"
					});
				}
			});
		}
	});
});

//аунтификация. вход в приложение
app.get("/protected", function (req, res) {
	// expressJwt({secret})
	var password = req.query.password,
	    phone = req.query.phone;

	//идем в базу ищем такого-то пользователя с таким-то паролем
	pool.query("SELECT COUNT(password) FROM users WHERE password='" + password + "';", function (err, results, fields) {
		//если пользователь с таким именем и паролем найден кладем данные в свойства объекта
		if (err) {
			res.json(500, { error: "Ошибка при проверке пароля" });
		} else {
			if (results[0]['COUNT(password)'] > 0) {
				pool.query("SELECT COUNT(phoneNumber) FROM users WHERE phoneNumber='" + phone + "' ", function (err, results, fields) {
					if (err) {
						res.json(500, { error: "Ошибка при проверке номера телефона" });
					} else {
						if (results[0]['COUNT(phoneNumber)'] > 0) {
							pool.query("SELECT user_id, name, surname, phoneNumber, city, accountType, rules FROM users WHERE password='" + password + "' AND phoneNumber='" + phone + "'", function (err, results, fields) {
								if (err) {
									res.json(500, { error: "Ошибка при получении данных пользователя" });
								} else {
									if (results.length !== 0) {
										res.json(200, results[0]);
									} else {
										res.json(404, { error: "Неверные данные или пользователь не существует" });
									}
								}
							});
						} else {
							res.json(404, { error: "Неверные данные или пользователь не существует" });
						}
					}
				});
			} else {
				res.json(404, { error: "Неверные данные или пользователь не существует" });
			}
		}
	});
});

//обновление инф. в аккаунте пользователя
app.get("/updateDatasAccount", function (req, res) {
	pool.query("SELECT user_id, name, surname, phoneNumber, city, accountType, rules FROM users WHERE user_id='" + req.query.userid + "';", function (err, results, fields) {
		if (err) {
			console.log(err);
		} else {
			res.json(200, results[0]);
		}
	});
});

//активные объявления пользователя
app.get("/userCardsAccepted", function (req, res) {
	pool.query("SELECT * FROM cards WHERE user_id='" + req.query.userid + "' AND status='accepted' ORDER BY(card_id) DESC;", function (err, results, fields) {
		if (err) {
			console.log("Ошибка при получении объявлений");
		} else {
			res.json(results);
		}
	});
});

//завершенные и объявления с отказом
app.get("/userCardsComplAndRejected", function (req, res) {
	pool.query("SELECT * FROM cards WHERE user_id='" + req.query.userid + "' AND (status='\u0441ompleted' OR status='rejected') ORDER BY(card_id) DESC;", function (err, results, fields) {
		if (err) {
			console.log("Ошибка при получении объявлений");
		} else {
			res.json(results);
		}
	});
});

//изменение данных пользователя
app.get("/updateUserData", function (req, res) {
	var userId = req.query.userId,
	    parametr = req.query.parametr,
	    value = req.query.value;

	pool.query("UPDATE users SET " + parametr + "=" + value + " WHERE user_id=" + userId + ";", function (err, results, fields) {
		if (err) {
			console.log(err);
			console.log("Информация о пользователе не изменена");
			res.json(500, { messsage: "Ошибка" });
		} else {
			console.log("Информация о пользователе успешно изменена");
			res.json(200, { message: "Изменено" });
		}
	});
});

//заверш. объяв.
app.get("/completeCard", function (req, res) {
	var cardId = req.param("cardId");
	pool.query("UPDATE cards SET status='\u0441ompleted' WHERE card_id=" + cardId + ";", function (err, results, fields) {
		if (err) {
			console.log("Ошибка остановки объявления");
			res.end();
		} else {
			console.log("Объявление остановленно");
			res.end();
		}
	});
});

//cards на главной
app.get("/list-hot-adv/:city", function (req, res) {
	console.log("/list-hot-adv");
	var func = function func(city) {
		if (city != "Все регионы") {
			return "AND city = \"" + city + "\" ";
		} else {
			return '';
		}
	};

	pool.query("SELECT * FROM cards WHERE status='accepted' AND advType IN('missing', 'find', 'gift', 'buy') " + func(req.params.city) + " ORDER BY(card_id) DESC LIMIT 15", function (err, results, fields) {
		res.write(JSON.stringify(results));
		res.end();
	});
});

//cards категорий
app.get("/list-animals/animal_type/:animaltype/advertisement_type/:advertisementtype/city/:city/count/:count", function (req, res) {
	var func = function func(city) {
		if (city != "Все регионы") {
			return "AND city = \"" + city + "\" ";
		} else {
			return '';
		}
	};

	pool.query("SELECT * FROM cards WHERE status='accepted' AND animalType = '" + req.params.animaltype + "' AND advType = '" + req.params.advertisementtype + "' " + func(req.params.city) + " ORDER BY(card_id) DESC LIMIT " + req.params.count, function (err, results, fields) {
		res.write(JSON.stringify(results));
		res.end();
	});
});

//скрытие кнопки
app.get("/list-animals/animal_type/:animaltype/advertisement_type/:advertisementtype/city/:city/count/:count/allcount", function (req, res) {
	var func = function func(city) {
		if (city != "Все регионы") {
			return "AND city = \"" + city + "\" ";
		} else {
			return '';
		}
	};

	pool.query("SELECT COUNT(card_id) FROM cards WHERE status='accepted' AND animalType = '" + req.params.animaltype + "' AND advType = '" + req.params.advertisementtype + "' " + func(req.params.city) + " ORDER BY(card_id) DESC LIMIT " + req.params.count, function (err, results, fields) {
		res.write(JSON.stringify(results));
		res.end();
	});
});

//подача card
app.post("/add-advertisement?", function (req, res) {

	pool.query("INSERT INTO cards VALUES(\n\t\tNULL,\n\t\t'" + req.param("title") + "',\n\t\t'" + req.param("briefDescription") + "',\n\t\t'" + req.param("city") + "',\n\t\t'" + req.param("userName") + "',\n\t\t'" + req.param("status") + "',\n\t\t'" + req.param("phoneNumber").replace(/\s/g, "") + "',\n\t\t0,\n\t\t'" + req.param("price") + "',\n\t\t'" + massZip + "',\n\t\t'" + req.param("animalType") + "',\n\t\t'" + req.param("advertisementType") + "',\n\t\t0,\n\t\t'" + req.param("userId") + "',\n\t\t'verified',\n\t\t'" + req.param("dataDelete") + "')", function (err, results, fields) {
		if (err) {
			console.log("Ошибка подачи объявления");
			console.log(err);
		} else {
			console.log("--------------Объявление загружено---------");
			console.log(mass);
			massZip = null;
			mass = null;
			imgPath = [];
			imgName = [];
			console.log("--------------Объявление загружено CLOSE---------");
			res.end();
		}
	});
});

//img
app.post("/add-advertisement/img/animalType/:animalType/advertisementType/:advertisementType", upload.array("photo"), function (req, res) {
	mass = _underscore2.default.zip(imgPath, imgName);
	massZip = mass.join(" ").replace(/,/g, "");
	console.log("-----------POST------------");
	console.log(massZip);
	console.log("-----------POST CLOSE------------");
	res.end();
});

//счетчик просмотров card
app.get("/updatecardviews/:cardId", function (req, res) {
	pool.query("UPDATE cards SET views = views + 1 WHERE card_id = " + req.params.cardId, function (err, results, fields) {
		if (err) {
			console.log("Ошибка изменения объявления");
		} else {
			res.end();
			console.log("Объявление c id " + req.params.cardId + " успешно изменено");
		}
	});
});

app.listen(port, function () {
	console.log("Listetining server. Port " + port + " " + URL_PATH);
});
