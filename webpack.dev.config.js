const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
  watch: true,
  entry: './src/index',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.ts$/,
        exclude: [ path.resolve(__dirname, "tests") ],
        enforce: 'post',
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',          
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: '/node_modules/'
      },
 
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  
  output: {
    filename: 'donut-chart.js',
    path: path.resolve(__dirname, './dist'),
    library: 'donutChart',
  },
  externals: {
    jquery: 'jQuery'
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    hot: true,
  },
  plugins: [
 
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
  
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/demo/demo.pug',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: `assets/css/main.css`,
    }),
  ],

};
