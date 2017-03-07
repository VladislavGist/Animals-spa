let webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
require("babel-polyfill");

module.exports = {
	entry: ["babel-polyfill", "./src/index.jsx"],
	output: {
		path: __dirname + "/public/build",
		publicPath: "build/",
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
				loader: ExtractTextPlugin.extract("style" ,"css-loader!autoprefixer-loader!resolve-url!sass-loader?sourceMap"),
				exclude: ["/node_modules/", "/public/"]
			},
			{
				test: /\.jsx$/,
				loader: "react-hot-loader!babel",
				exclude: ["/node_modules/", "/public/"]
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				test: /\.(png|jpg|svg|gif|ttf|eot|woff|woff2)$/,
				loader: "file?name=[path][name].[ext]?[hash]"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("bundle.css", {
			allChunks: true,
			disable: process.env.NODE_ENV == "development"
		})
	]
}