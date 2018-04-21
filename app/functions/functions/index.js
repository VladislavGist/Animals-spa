const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const functions = require('firebase-functions')

admin.initializeApp()

let cors = require('cors')({
	origin: true
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