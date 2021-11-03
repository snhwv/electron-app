/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';
import path from 'path';
export default {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    alias: {
      '@config': path.resolve(__dirname, '../../config'),
      '@constants': path.resolve(__dirname, '../../constants'),
      '@components': path.resolve(__dirname, '../../src/renderer/components'),
      '@utils': path.resolve(__dirname, '../../src/renderer/utils'),
      '@contexts': path.resolve(__dirname, '../../src/renderer/contexts'),
      '@globalApi': path.resolve(
        __dirname,
        '../../src/renderer/common/globalApi.ts'
      ),
      '@store': path.resolve(__dirname, '../../src/renderer/store'),
      '@style': path.resolve(__dirname, '../../src/renderer/style'),
    },
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};
