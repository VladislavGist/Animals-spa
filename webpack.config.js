let webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
require("babel-polyfill");

module.exports = {
	entry: ["babel-polyfill", "./src/index.jsx"],
	output: {
		path: __dirname + "/public/",
		publicPath: "/",
		filename: "bundle.js"
	},
	devtool: "#cheap-module-source-map",
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel",
				exclude: ["/node_modules/", "/public/"]
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader!autoprefixer-loader",
				exclude: ["/node_modules/", "/public/"]
			},
			{
				test: /\.sass$/,
				loader: ExtractTextPlugin.extract("style", "css-loader!autoprefixer-loader!resolve-url-loader!sass-loader?sourceMap"),
				exclude: ["/node_modules/", "/public/"]
			},
			{
				test: /\.jsx$/,
				loader: "react-hot-loader!babel",
				exclude: ["/node_modules/", "/public/"]
			},
			{ test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url?limit=10000' },
			{ test: /\.((ttf|eot|woff)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff)$/, loader: "file?publicPath=./&name=fonts/[name].[ext]" },
			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("bundle.css", {
			allChunks: true,
			disable: process.env.NODE_ENV == "development"
		}),
		new webpack.DefinePlugin({
			'process.env': {
					NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
}