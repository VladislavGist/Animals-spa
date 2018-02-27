import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

import db from '../db'
import routes from '../routes/index'
import AppClass from '../classes/app'
import config from '../configs/config'
import middlewares from '../middlewares/index'

const App = new AppClass

const port = process.env.NODE_ENV === 'dev' ? config.port.dev : config.port.prod

const app = express()

require('../auth/auth')

app.use(cors([ process.env.URL_PATH, 'http://localhost:8090'] ))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', routes)

app.use('/static', express.static('./../www'))

app.use(middlewares)

db.connect(config.db, err => {

	if (err) console.log('connections err', err)

	app.listen(port, () => {
		App.deleteCardsTimer()
		console.log('Server start', port)
	})

})
