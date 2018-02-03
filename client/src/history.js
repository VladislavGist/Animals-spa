if (process.env.BROWSER) {

	const { createHashHistory } = require('history')

	module.exports = createHashHistory()
}