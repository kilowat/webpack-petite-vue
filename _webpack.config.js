const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { resolve } = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const templateName = path.resolve(__dirname, '..').split(path.sep).pop();
const isDev = process.env.NODE_ENV === 'development';
const isStats = process.env.NODE_ENV === 'stats';
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
    main: ["./src/js/main.ts", "./src/scss/main.scss"],
  },
  output: {
    filename: "./js/[name].bundle.js",
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    //Creates a chunk named prefix_Hash.
    chunkFilename: 'js/[name]_[contenthash].js',
    //default root
    //publicPath : `/local/templates/${templateName}/assets/dist/`,

  },
  devtool: isDev ? "source-map" : false,
  mode: isDev ? "development" : "production",
  optimization: {
    minimize: !isDev ,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2017,
          safari10: true
        },
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
    watchFiles: ['src/**', 'tests/**'],
    devMiddleware: {
      writeToDisk:false,
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000
  },
  resolve: {
    extensions: ['.js',],
    modules: ["node_modules"],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: isDev ? 'tsconfig.json' : 'tsconfig.prod.json',
          }
        }
      ],
        exclude: /node_modules/,
      },
      
      {
        test: /\.(css|sass|scss)$/,
        include: [
          path.resolve(__dirname, "src/scss"),
          path.resolve(__dirname, "src/js"),
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [{
            loader: 'lit-scss-loader',
            options: {
                minify: true, // defaults to false
            },
          },
          {
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
          },
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

function clearDist() {
  const p = path.resolve(__dirname, './dist/js')
  if (!fs.existsSync(p)) return;
  let regex = /[.]gz$/

  fs.readdirSync(p)
      .filter(f => regex.test(f))
      .map(f => fs.unlinkSync(p + '/' + f))
}

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    clearDist();
  }
  return config;
};
