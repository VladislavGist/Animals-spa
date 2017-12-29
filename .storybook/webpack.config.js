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
		  }
    ]
  },
};
