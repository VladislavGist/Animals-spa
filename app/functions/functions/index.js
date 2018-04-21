const moment = require('moment')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const functions = require('firebase-functions')

let normalizeFirebaseDatas = obj => {
	let res = []

	for(let key in obj) {
		res.push( Object.assign({}, { key }, obj[key]))
	}

	return res
}

admin.initializeApp()

let cors = require('cors')({
	origin: true
})

exports.testQuotes = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		response.json(200, { cont: 'yes' })
	})
})

exports.delete = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		moment.locale('ru')

		let nowDate = moment().format('DD-MM-YYYY');

		admin.database().ref('users').on('value', usersList => {
			normalizeFirebaseDatas(usersList.val()).forEach(user => {
				
				admin.database().ref(`users/${ user.key }/articles`).on('value', cardsList => {
					normalizeFirebaseDatas(cardsList.val()).forEach((card, idx, array) => {

						if (card.deleteDate === nowDate) {
							admin.database().ref(`users/${ user.key }/articles/${ card.key }`).set(null)
						}

						if (idx === array.length) {
							response.json(200, { res: 'yesss' })
						}
					})
				})
			})
			
		})
	})
})

exports.sendemail = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		let datas = JSON.parse(request.body)

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'spanshine.vlad@gmail.com',
				pass: 'dc0781907819'
			}
		})

		const mailOptions = {
			from: `Animals ${ datas.email }`,
			to: 'studio_kseven@mail.ru',
			subject: `Тема письма: ${ datas.title }`,
			html: `<p>Имя: ${ datas.name } <br/> Сообщение: ${ datas.textArea } <br/> Моя почта: ${ datas.email }</p>`
		}

		transporter.sendMail(mailOptions, err => {
			if (err) {
				response.json(500, `Ошибка отправки письма на почту: ${ err }`)
			}

			response.json(200, { message: 'Отправлено' })
		})
	})
})