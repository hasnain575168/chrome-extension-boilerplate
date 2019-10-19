const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({
  mode
}) => ({

  plugins: [
    new MiniCssExtractPlugin({
      filename: '../styles/[name].css'
    })
  ],

  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /.(s)?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hrm: mode
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  entry: {
    popup: [
      '@babel/polyfill',
      './src/popup/index.js'
    ],
    content: [
      '@babel/polyfill',
      './src/content/index.js'
    ],
    background: [
      '@babel/polyfill',
      './src/background/index.js'
    ],
  },

  output: {
    path: path.resolve(__dirname, 'addon', 'scripts'),
    filename: '[name].js'
  },

  mode

});