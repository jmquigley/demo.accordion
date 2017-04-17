module.exports = {
	entry: './src/app.tsx',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		extensions: ['.jsx', '.js', '.ts', '.tsx', '.css']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
		]
	}
}