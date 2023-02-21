const currentTask = process.env.npm_lifecycle_event
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
  require("postcss-mixins"),
  require("postcss-hexrgba"),
]

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', function() {
      fse.copySync('./app/assets/images', './docs/assets/images')
    })}
}

let cssConfig = {
  test: /\.css$/i,
  use: ['css-loader', {
    loader: 'postcss-loader', 
    options: {
      postcssOptions: {
        plugins: postCSSPlugins}
    }
  }],
};

let pages = fse.readdirSync('./app').filter(function(file) {
  return file.endsWith('.html')
}).map(function(page) {
  return new HtmlWebpackPlugin({
    filename: page,
    template: `./app/${page}`
  })
})

let config = {
  entry: './app/assets/scripts/App.js',
  plugins: pages, 
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/inline',
      },
      cssConfig
    ],
  },
};

if (currentTask == 'dev') {
  cssConfig.use.unshift('style-loader')
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
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  })
  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  config.output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs'),
    clean: true,
  },
  config.mode = "production",
  config.optimization = {
    splitChunks: {chunks: 'all'},
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
  config.plugins.push(
    new MiniCssExtractPlugin({filename: `styles.[hash].css`}),
    new RunAfterCompile()
    )
};


module.exports = config