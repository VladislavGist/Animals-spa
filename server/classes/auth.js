import { connectDB } from '../db'

export default class Auth {

	creareUser(req, res) {

		// получает от пользователя: имя, телефон, пароль, город, емейл
		const reqData = {
			name: req.body.name,
			surname: req.body.surname,
			phone: req.body.phone.replace(/\s/g, ''),
			password: req.body.password,
			city: req.body.city,
			email: req.body.email.replace(/\s/g, '')
		}

		// проверяем нет ли пользователям с таким же номером телефона
		connectDB().query(`SELECT COUNT(phoneNumber) FROM users WHERE phoneNumber='${reqData["phone"]}';`, (err, results) => {

			if (err) {
				res.json({ error: 'Ошибка ответа от базы данных' })

			} else if(results[0]['COUNT(phoneNumber)'] > 0) {

				// проверяем нет ли пользователям с таким же номером телефона
				res.json({ message: 'Пользователь с таким номером телефона уже существует' })

			} else {

				// регистрируем нового пользователя
				connectDB().query(`INSERT INTO users VALUES(NULL, '${ reqData["name"] }', '${ reqData["surname"] }', '${ reqData["phone"] }', '${ reqData["city"] }', '${ reqData["password"] }', 'PRIVATE_SELLER', '${ reqData["email"] }', NULL);`, (err, results) => {

					if(err) {
						res.json('Ошибка при регистрации нового пользователя')

					} else {
						// подписываем данные с ключем. отправляем клиенту данные
						// token: jwt.sign(reqData, secret) - не понятно зачем нужен jwt
						return res.json({ message: 'Вы успешно зарегистрированы' })
					}
				})
			}
		})

	}

	findUser(username, password, done) {

		const phone = username

		// идем в базу ищем такого-то пользователя с таким-то паролем
		connectDB().query(`SELECT COUNT(password) FROM users WHERE password='${ password }';`, (err, results) => {
			// если пользователь с таким именем и паролем найден кладем данные в свойства объекта
			if (err) {
				done(null, false, { error: 'Ошибка при проверке пароля' })
			} else {
				if (results[0]['COUNT(password)'] > 0) {
					connectDB().query(`SELECT COUNT(phoneNumber) FROM users WHERE phoneNumber='${ phone }' `, (errTwo, resultsTwo) => {
						if (errTwo) {
							done(null, false, { error: 'Ошибка при проверке номера телефона' })
						} else {
							if (resultsTwo[0]['COUNT(phoneNumber)'] > 0) {
								connectDB().query(`SELECT user_id, name, surname, phoneNumber, city, accountType, rules FROM users WHERE password='${ password }' AND phoneNumber='${ phone }'`, (errThree, resultsThree) => {
									if (errThree) {
										done(null, false, { error: 'Ошибка при получении данных пользователя' })
									} else {
										if (resultsThree.length !== 0) {
											done(null, resultsThree[0])
										} else {
											done(null, false, { error: 'Неверные данные или пользователь не существует' })
										}
									}
								})
							} else {
								done(null, false, { error: 'Неверные данные или пользователь не существует' })
							}
						}
					})
				} else {
					done(null, false, { error: 'Неверные данные или пользователь не существует' })
				}
			}
		})

	}
}
