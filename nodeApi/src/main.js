// import fs from 'fs'
// import https from 'https'
import express from 'express'

import db from '../db'
import routes from '../routes/index'
import AppClass from '../classes/app'
import config from '../configs/config'
import middlewares from '../middlewares/index'

const App = new AppClass

const port = process.env.NODE_ENV === 'dev' ? config.port.dev : config.port.prod

const app = express()

require('../auth/auth')

app.use(middlewares)
app.use('/api', routes)

// const httpsOptions = {
// 	key: fs.readFileSync('server.key'), // путь к ключу
// 	cert: fs.readFileSync('server.crt') // путь к сертификату
// }

db.connect(config.db, err => {

	if (err) console.log('connections err', err)

	// https.createServer(httpsOptions, app).listen(port, () => {
	// 	App.deleteCardsTimer()
	// 	console.log('Server start', port)
	// })

	app.listen(port, () => {
		App.deleteCardsTimer()
		console.log('Server start', port)
	})

})
