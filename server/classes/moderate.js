import { connectDB } from '../db'

export default class Moderate {

	replaceStatuCard(req, res) {

		const { cardid, status } = req.body

		connectDB().query(`UPDATE cards SET status='${ status }' WHERE card_id=${ cardid }`, err => {

			if (err) {
				console.log('Ошибка при изменении статуса обявления')
				console.log(err)
				res.json(500, { message: 'error' })
			} else {
				console.log('Статус объявления изменен')
				res.json(200, { message: 'Статус объявления изменен' })
			}
		})
	}

	moderate(req, res) {

		connectDB().query('SELECT * FROM cards WHERE status="verified"; ', (err, results) => {

			if (err) {
				console.log('Ошибка при получении объявлений для модерации')
				res.end()
			} else {
				console.log('Объявления отданы')
				res.write(JSON.stringify(results))
				res.end()
			}
		})
	}
}