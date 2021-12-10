const { htmlWebpackPluginGlob } = require('html-webpack-plugin-glob');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

module.exports = (env, argv) => {
  function onDev(onDev, onProd = undefined) {
    return argv.mode !== 'production' ? onDev : onProd;
  }

  /** @type {import('webpack').Configuration} */
  const config = {
    entry: './src/ts/bootstrap.ts',
    module: {
      rules: [
        {
          test: /\.html$/i,
          exclude: /(node_modules)/,
          loader: 'html-loader',
        },
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: onDev(true, false),
                sassOptions: {
                  outputStyle: 'compressed',
                },
              },
            },
          ],
        },
        {
          test: /\.(bmp|ico|cur|gif|jpg|jpeg|jfif|png|svg|webp|png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(csv|tsv)$/i,
          use: 'csv-loader',
        },
        {
          test: /\.xml$/i,
          use: 'xml-loader',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'bundle.[contenthash].css' }),
      // @ts-ignore
      new PurgeCSSPlugin({
        paths: glob.sync('src/**/*', { nodir: true }),
      }),
      new CopyPlugin({
        patterns: [{ from: 'src/public', to: '' }],
      }),
      ...htmlWebpackPluginGlob({ path: './src/pages/' }),
    ],
    resolve: {
      extensions: ['.js', '.ts', '.css', '.scss'],
    },
    devtool: onDev('eval-source-map'),

    // @ts-ignore
    devServer: onDev({
      magicHtml: true,
      liveReload: true,
      hot: true,
      watchFiles: path.resolve(__dirname, './src'),
    }),

    watchOptions: {
      ignored: '**/node_modules',
    },

    output: {
      clean: true,
      path: path.join(__dirname, 'public'),
      filename: 'bundle.[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext]',
    },

    mode: onDev('development', 'production'),
  };

  return config;
};
