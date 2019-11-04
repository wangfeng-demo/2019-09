let path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	OptmizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'),
	UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.min.[hash].js",
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		port: 3000,
		contentBase: "./dist",
		progress: true
	},
	optimization: {
		minimizer: [
			new OptmizeCssAssetsWebpackPlugin(),
			new UglifyjsWebpackPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			})
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/banner.html",
			filename: "index.html"
		}),
		new MiniCssExtractPlugin({
			filename: "bundle.min.[hash].css"
		})
	],
	module: {
		rules: [{
			test: /\.(css|less)$/i,
			use: [MiniCssExtractPlugin.loader, "css-loader", {
				loader: "postcss-loader",
				options: {
					ident: "postcss",
					plugins: [require("autoprefixer")]
				}
			}, "less-loader"]
		}, {
			test: /\.js$/i,
			exclude: /node_modules/,
			include: path.resolve(__dirname, 'src'),
			use: [{
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"],
					plugins: ["@babel/plugin-transform-runtime"]
				}
			}]
		}, {
			test: /\.(jpg|jpeg|png|gif|ico|svg|bmp|webp)$/i,
			use: [{
				loader: "url-loader",
				options: {
					limit: 100 * 1024,
					outputPath: "/images"
				}
			}]
		}, {
			test: /\.(html|xml|htm)$/i,
			use: ["html-withimg-loader"]
		}]
	}
};