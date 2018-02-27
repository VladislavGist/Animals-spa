import fs from 'fs'
import path from 'path'
import _ from 'underscore'
import moment from 'moment'
import nodemailer from 'nodemailer'

import { connectDB } from '../db'

export default class App {

	deleteCardsTimer() {

		moment.locale('ru')

		setInterval(() => {

			const nowDay = moment().format('ll')
			const nowTime = moment().format('LTS')

			if (nowTime === '00:00:00' && nowTime !== '00:00:05') {

				// удаление изображений на сервере
				connectDB().query(`SELECT imgPath FROM cards WHERE data_delete='${ nowDay }';`, (err, results) => {

					if (err) {
						console.log('Ошибка удаления файлов')
						console.log(err)
					} else {

						// пути в чистом виде
						let paths = []

						// функция поиска и удаления файлов
						const delteImages = (firstFilder, secondFolder, name) => {

							const myPath = `./uploads/${ firstFilder }/${ secondFolder }/${ name }`

							fs.unlink(myPath, errTwo => {
								if (err) {
									console.log(errTwo)
									paths = []
								} else {
									console.log(`${ myPath } удален`)
									paths = []
								}
							})
						}

						for(let i = 0; i < results.length; i++) {
							paths.push(results[i].imgPath + ' ')
						}

						const finalPaths = _.compact(paths).join('')

						// пути без хостов
						const array = _.compact(finalPaths.replace(/http:.{2,}?\//g, '').split(' '))

						// массив путей со слешами. убираем их
						const array2 = _.map(array, e => e.replace(/\//g, ' '))

						// массив путей без слешей. на каждое слово вызываем функцию удаления
						const array3 = _.each(array2, e => {
							const massStr = e.split(' ')
							console.log(massStr)
							// запуск функции поиска и удаления
							// аргумены: папка, папка, имя файла
							delteImages(massStr[0], massStr[1], massStr[2])
						})
					}
				})

				// удаление объявлений в базе
				connectDB().query(`DELETE FROM cards WHERE data_delete='${ nowDay }';`,
					err => {
						if (err) {
							console.log('Ошибка удаления объявлений')
							console.log(err)
						}
						console.log('Объявления удалены')
					})
			}

		}, 1000)
	}

	sendUs(req, res) {

		const { name, email, title, mess } = req.body

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'spanshine.vlad@gmail.com',
				pass: 'dc0781907819'
			}
		})

		const mailOptions = {
			from: `Animals ${ email }`,
			to: 'studio_kseven@mail.ru',
			subject: `Тема письма: ${ title }`,
			html: `<p>Имя: ${ name } <br/> Сообщение: ${ mess } <br/> Моя почта: ${ email }</p>`
		}

		transporter.sendMail(mailOptions, err => {
			if (err) {
				res.json(500, { message: 'Ошибка отправки письма на почту' })
			} else {
				res.json(200, { message: 'Отправлено' })
			}
		})
	}

	disabledBtn(req, res) {

		const { animal_type, advertisement_type, city } = req.query

		const func = city => {
			if(city !== 'Все регионы') {
				return `AND city = '${ city }' `
			}
			return ''
		}

		connectDB().query(`SELECT * FROM cards WHERE status='accepted' AND animalType = '${ animal_type }' AND advType = '${ advertisement_type }' ${ func(city) } ORDER BY(card_id) DESC`, (err, results) => {
			res.write(JSON.stringify(results))
			res.end()
		})
	}

	filterCity(req, res) {

		const { animal_type, advertisement_type, city, count } = req.query

		const func = city => {
			if(city !== 'Все регионы') {
				return `AND city='${ city }' `
			}
			return ''
		}

		connectDB().query(`SELECT * FROM cards WHERE status='accepted' AND animalType='${ animal_type }' AND advType='${ advertisement_type }' ${ func(city) } ORDER BY(card_id) DESC LIMIT ${ count }`, (err, results) => {
			res.write(JSON.stringify(results))
			res.end()
		})
	}

}