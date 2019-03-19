const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL
const API_URL = (NODE_ENV === 'development' && !EXTERNAL_API_URL) ? 'http://localhost:8080' : EXTERNAL_API_URL

const extractSass = new ExtractTextPlugin({
	filename: '[name].css',
	disable: process.env.NODE_ENV === 'development'
})

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: [/node_modules/, /public/]
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
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
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
				BROWSER: JSON.stringify(true),
				NODE_ENV: JSON.stringify(NODE_ENV),
				API_URL: JSON.stringify(API_URL)
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
}