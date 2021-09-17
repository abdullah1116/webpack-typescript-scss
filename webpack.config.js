const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { config } = require('process');

module.exports = (env, argv) => {
  const dev = argv.mode !== 'production';
  const onDev = (d, p = undefined) => (dev ? d : p);

  /** @type {import('webpack').Configuration} */
  const config = {
    entry: './src/ts/index.ts',
    module: {
      rules: [
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
                sourceMap: dev,
                sassOptions: {
                  outputStyle: 'compressed',
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
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
      path: path.join(__dirname, 'public'),
      filename: '[name].[contenthash].js',
      clean: true,
    },

    mode: onDev('development', 'production'),
  };

  return config;
};
