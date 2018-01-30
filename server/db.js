import mysql from 'mysql'

const state = { db: null }

exports.connect = (data, done) => {

	if (state.db) return done()

	const connection = mysql.createConnection(data)

	connection.connect(err => {
		if (err) return done(err)
		state.db = connection
		done()
	})
}

exports.connectDB = () => state.db