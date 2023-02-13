const path = require('path');

module.exports = {
  entry: {
    task11: './task1/task11/index.ts', 
    task12: './task1/task12/index.ts',
    task21: './task2/task21/index.ts',
  },
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
};