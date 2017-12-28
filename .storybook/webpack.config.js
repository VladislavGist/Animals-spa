const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
	filename: '[name].[contenthash].css',
	disable: true
})

module.exports = {
	entry: './src/index.js',
  plugins: [
	  extractSass
  ],
	devtool: 'cheap-module-source-map',
  module: {
	  rules: [
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
    ]
  },
};
