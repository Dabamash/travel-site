const currentTask = process.env.npm_lifecycle_event
const path = require('path');

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
  require("postcss-mixins"),
  require("postcss-hexrgba"),
]

let config = {
  entry: './app/assets/scripts/App.js',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader', 
          options: {
            postcssOptions: {
              plugins: postCSSPlugins}
          }
        }],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/inline',
      },
    ],
  },
};

if (currentTask == 'dev') {
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app'),
  },
  config.devServer = {
    static: path.join(__dirname, 'app'),
    hot: false,
    open: true,
    port: 3000,
    host: '0.0.0.0',
  },
  config.mode = "development"
};

if (currentTask == 'build') {
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'dist'),
  },
  config.mode = "production"
};


module.exports = config