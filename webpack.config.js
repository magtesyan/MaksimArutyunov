const path = require(`path`);
const fs = require(`fs`);

const webpack = require(`webpack`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const { CleanWebpackPlugin } = require(`clean-webpack-plugin`);
const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const ImageminPlugin = require(`imagemin-webpack-plugin`).default;
const ImageminWebpWebpackPlugin = require(`imagemin-webp-webpack-plugin`);
const TerserPlugin = require(`terser-webpack-plugin`);
const OptimizeCSSAssetsPlugin = require(`optimize-css-assets-webpack-plugin`);

const isProd = process.argv.indexOf(`-p`) !== -1;

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  // const htmlFiles = templateFiles.filter(templateFile => {
  //   const parts = templateFile.split(`.`);
  //   return parts[1] === `html`;
  // });

  const htmlFiles = templateFiles
    .filter(templateFile => {
      return fs.statSync(templateDir + '/' + templateFile).isDirectory();
    })
    .reduce((all, subDir) => {
      return [...all, ...fs.readdirSync(templateDir + '/' + subDir).map(e => subDir + '/' + e)];
    }, []);

  return htmlFiles.map(htmlFile => {
    const parts = htmlFile.split(`.`);
    const name = parts[0];
    const extension = parts[1];

    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: true,
    });
  });
}

const htmlPlugins = generateHtmlPlugins(`./source/html/views/`);
const htmlPlugins1 = generateHtmlPlugins(`./source/html/views/corporate`);

module.exports = {
  mode: isProd ? `production` : `development`,
  entry: {
    bundle: `./source/js/index.js`,
    style: `./source/scss/style.scss`,
  },
  devtool: `inline-source-map`,
  devServer: {
    contentBase: path.join(__dirname, `source/`),
    port: 9001,
    hot: true,
    compress: true,
    progress: true,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: `babel-loader`,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: `css-loader`,
            options: {
              url: false,
            },
          },
          {
            loader: `postcss-loader`,
          },
          {
            loader: `sass-loader`,
          },
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, `source/html/includes`),
        use: [`raw-loader`],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/[name].min.css`,
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `source/html/views/index.html`,
      favicon: `./source/favicon.ico`,
    }),
    new HtmlWebpackPlugin({
      filename: `corporate.html`,
      template: `source/html/views/corporate.html`,
      favicon: `./source/favicon.ico`,
    }),
    new HtmlWebpackPlugin({
      filename: `children.html`,
      template: `source/html/views/children.html`,
      favicon: `./source/favicon.ico`,
    }),
    new HtmlWebpackPlugin({
      filename: `agents.html`,
      template: `source/html/views/agents.html`,
      favicon: `./source/favicon.ico`,
    }),
    new HtmlWebpackPlugin({
      filename: `photos.html`,
      template: `source/html/views/photos.html`,
      favicon: `./source/favicon.ico`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `./source/fonts`,
          to: `./fonts`,
        },
        {
          from: `./source/img`,
          to: `./img`,
        },
        {
          from: `./source/vendors`,
          to: `./vendors`,
        },
        {
          from: `./source/php`,
          to: `./php`,
        },
      ],
    }),
    new ImageminPlugin({
      test: `source/img/**`,
      optimizationLevel: 3,
      progressive: true,
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 85,
          },
        },
      ],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true,
    }),
  ]
    .concat(htmlPlugins)
    .concat(htmlPlugins1),
  output: {
    filename: `js/[name].js`,
    path: path.resolve(__dirname, `build`),
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: `all`,
    },
    minimizer: isProd
      ? [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
          }),
          new OptimizeCSSAssetsPlugin({}),
        ]
      : [],
  },
};
