import { connectDB } from '../db'

class User {

	updateUserData(req, res) {

		const { userId, parametr, value } = req.body

		connectDB().query(`UPDATE users SET ${ parametr }='${ value }' WHERE user_id=${ userId };`, err => {
			if (err) {
				console.log('Информация о пользователе не изменена')
				res.json(500, { messsage: 'Ошибка', err })
			} else {
				console.log('Информация о пользователе успешно изменена')
				res.json(200, { message: 'Изменено' })
			}
		})
	}

	userDatas(req, res) {

		connectDB().query(`SELECT user_id, name, surname, phoneNumber, city, accountType, rules FROM users WHERE user_id='${ req.query.userid }';`, (err, results) => {
			if (err) console.log(err)
			res.json(200, results[0])
		})
	}

	completeCard(req, res) {

		const { cardId } = req.body

		connectDB().query(`UPDATE cards SET status='сompleted' WHERE card_id=${ cardId };`, err => {
			if (err) {
				console.log('Ошибка остановки объявления')
				res.end()
			} else {
				console.log('Объявление остановленно')
				res.end()
			}
		})
	}

	userCardsAccepted(req, res) {

		connectDB().query(`SELECT * FROM cards WHERE user_id='${ req.query.userid }' AND status='accepted' ORDER BY(card_id) DESC;`, (err, results) => {
			if (err) console.log('Ошибка при получении объявлений')
			res.json(results)
		})
	}

	userCardsComplAndRejected(req, res) {

		connectDB().query(`SELECT * FROM cards WHERE user_id='${ req.query.userid }' AND (status='сompleted' OR status='rejected') ORDER BY(card_id) DESC;`, (err, results) => {
			if (err) console.log('Ошибка при получении объявлений')
			res.json(results)
		})
	}

}

export default User