const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const config = require('./configs/config')

const { db, sqlDatasProd, urlPaths, urlServerPath } = config

const { NODE_ENV } = process.env
const DATABASE = NODE_ENV === 'dev' ? db : sqlDatasProd
const URL_PATH = NODE_ENV === 'dev' ? urlPaths.dev : urlPaths.prod
const URL_SERVER_PATH = NODE_ENV === 'dev' ? urlServerPath.dev : urlServerPath.prod

module.exports = {
	entry: path.resolve(__dirname, 'src/main.js'),
	externals: [nodeExternals()],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				BROWSER: JSON.stringify(false),
				NODE_ENV: JSON.stringify(NODE_ENV),
				URL_PATH: JSON.stringify(URL_PATH),
				URL_SERVER_PATH: JSON.stringify(URL_SERVER_PATH),
				DATABASE: JSON.stringify(DATABASE),
			}
		})
	]
}