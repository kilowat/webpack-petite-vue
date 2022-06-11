const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { resolve } = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const templateName = path.resolve(__dirname, '..').split(path.sep).pop();
const isDev = process.env.NODE_ENV === 'development';
/*sprites path settings*/
const svgPath = '/sprites/spritemap.svg';
/*****************************************/

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
      svgPath: svgPath,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    });
  });
}

const htmlPlugins = generateHtmlPlugins("./src/html/views");

const config = {
  target:'web',
  entry: {
    main: ["./src/js/main.js", "./src/scss/main.scss"],
  },
  output: {
    filename: "./js/[name].bundle.js",
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[name]_[contenthash].js',
    //Ниже настройки для cms,
    //Путь куда билдить файлы в шаблон CMS
    //publicPath : `/local/templates/${templateName}/assets/dist/`,
    //Создёт чанк с названием префикс_Хеш, для формирования Preload Link.
    //Нужен php скрипт, который по префиксу name будет получить путь до чанка и в head вставлять preload ссылку до чанка.
  },
  devtool: isDev ? "source-map" : false,
  mode: isDev ? "development" : "production",
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        parallel: false,
        terserOptions: {
          sourceMap: isDev,
        },
      })
    ],
  },
  devServer: {
    host: 'localhost',
    watchFiles: ['src/**'],
    devMiddleware: {
      writeToDisk: false,
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000
  },
  resolve: {
    extensions: ['.js'],
    modules: ["node_modules"],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
              ]
            ]
          }
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        include: [
          path.resolve(__dirname, "src/scss"),
          path.resolve(__dirname, "src/components"),
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [, ],
                sourceMap: isDev,
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: `
                @import "./src/scss/_variables.scss";
                @import "~breakpoint-sass";
              `
            }
          }
        ]
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, "src/html/includes"),
        use: ["raw-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: path.resolve(__dirname, "src/fonts/"),
        use: [{
          loader: 'file-loader',
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].bundle.css",
    }),
    new SVGSpritemapPlugin('./src/svgicons/**/*.svg', {
      output: {
        filename: svgPath,
      }
    }),
    new CopyWebpackPlugin({
      patterns: [{
          from: "./src/fonts",
          to: "./fonts"
        },
        {
          from: "./src/img",
          to: "./img"
        },
        {
          from: "./src/uploads",
          to: "./uploads"
        }
      ]
    }),
    ...htmlPlugins,
  ],
};

if (!isDev) {
  config.plugins.push(
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: 'gzip',
      test: /\.js$|\.svg$|\.css$$/,
      threshold: 10240,
      minRatio: 1
    }));
}

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    //to do something
  }
  return config;
};
