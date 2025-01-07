module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    path: `${__dirname}/public/dist/`,
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 8100,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'react-refresh/babel',  // Aggiungi questo loader per usare React Fast Refresh
          },
        ],
      },
    ],
  },
};
