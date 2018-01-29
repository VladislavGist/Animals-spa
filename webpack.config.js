const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PROCESS_ENV = process.env.NODE_ENV
// const URL_PATH = (PROCESS_ENV === 'development') ? 'http://localhost:8080' : 'https://still-anchorage-46659.herokuapp.com'
//когда буду билдить на рабочий сервер, то вернуть верхнюю строку и в конце указать его
const URL_PATH = (PROCESS_ENV === 'development') ? 'http://localhost:8080' : 'http://oblako.pet'

const extractSass = new ExtractTextPlugin({
	filename: '[name].css',
	disable: process.env.NODE_ENV === 'development'
})

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'nodeApi/www/'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: [/node_modules/, /www/]
			},
			{
				test: /\.sass/,
				use: extractSass.extract({
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'resolve-url-loader'
					}, {
						loader: 'sass-loader?sourceMap'
					}],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
				use: 'url-loader?limit=10000'
			},
			{
				test: /\.((ttf|eot|woff)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '/fonts/',
							publicPath: '.'
						}
					}
				]
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			}
		]
	},
	plugins: [
		extractSass,
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(PROCESS_ENV),
				URL: JSON.stringify(URL_PATH)
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
}