import multer from 'multer'

import { connectDB } from '../db'

export default class Cards {

	constructor() {
		this.imgPath = []
		this.imgName = []
		this.mass = null
		this.massZip = null
		this.storage = multer.diskStorage({

			destination: (request, file, cb) => {

				const animalType = request.originalUrl.split('/')[4]
				const advertisementType = request.originalUrl.split('/')[6]

				if (file.mimetype !== 'image/jpeg') {
					console.log('Неверный формат файла')
					console.log(file.mimetype)
				} else {
					cb(null, `uploads/${ animalType }/${ advertisementType }`)
					this.imgPath.push(`${ process.env.URL_SERVER_PATH }/${ animalType }/${ advertisementType }`)
				}
			},

			filename: (request, file, cb) => {

				const animalType = request.originalUrl.split('/')[4]
				const advertisementType = request.originalUrl.split('/')[6]
				const dateNow = Date.now()

				if (file.mimetype !== 'image/jpeg') {
					console.log('Неверный формат файла')
					console.log(file.mimetype)
				} else {
					const random = Math.random(0, 10000)
					cb(null, `${ animalType }-${ advertisementType }-${ dateNow + random }`)
					this.imgName.push(`/${ animalType }-${ advertisementType }-${ dateNow + random }`)
				}
			}
		})
	}

	indexPageCards(req, res) {

		const func = city => {
			if (city !== 'Все регионы') {
				return `AND city = '${ city }' `
			}
			return ''
		}

		connectDB().query(`SELECT * FROM cards WHERE status='accepted' AND advType IN('missing', 'find', 'gift', 'buy') ORDER BY(card_id) DESC LIMIT 15`, (err, results) => {
			res.write(JSON.stringify(results))
			res.end()
		})
	}

	cardCounter(req, res) {

		connectDB().query(`UPDATE cards SET views = views + 1 WHERE card_id = ${ req.body.cardId }`, err => {
			if (err) console.log('Ошибка изменения объявления')
			res.end()
			console.log(`Объявление c id ${ req.body.cardId } успешно изменено`)
		})
	}

	addCard(req, res) {

		connectDB().query(`INSERT INTO cards VALUES(NULL, '${ req.param('title') }', '${ req.param('briefDescription') }', '${ req.param('city') }', '${ req.param('userName') }', '${ req.param('status') }', '${ req.param('phoneNumber').replace(/\s/g, '') }', 0, '${ req.param('price') }', '${ this.massZip }', '${ req.param('animalType') }', '${ req.param('advertisementType') }', 0, '${ req.param('userId') }', 'verified', '${ req.param('dataDelete') }')`,
		err => {
			if (err) {
				console.log('Ошибка подачи объявления')
				console.log(err)
			} else {
				console.log('--------------Объявление загружено---------')
				console.log(this.mass)
				this.massZip = null
				this.mass = null
				this.imgPath = []
				this.imgName = []
				console.log('--------------Объявление загружено CLOSE---------')
				res.end()
			}
		})
	}

	addImg(req, res) {
		this.mass = _.zip(this.imgPath, this.imgName)
		this.massZip = this.mass.join(' ').replace(/,/g, '')
		console.log('-----------POST------------')
		console.log(this.massZip)
		console.log('-----------POST CLOSE------------')
		res.end()
	}

}