const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob');
const VERSION = require('./package.json').version;

const GitRevisionPlugin = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'rev-list HEAD --count --no-merges',
});

function resolve(dir) {
  return path.join(__dirname, dir);
}

function getEntry(rootSrc, pattern) {
  const files = glob.sync(path.resolve(rootSrc, pattern));
  return files.reduce((res, file) => {
    const info = path.parse(file);
    const key = `${info.dir.slice(rootSrc.length + 1)}/${info.name}`;
    res[key] = path.resolve(file);
    return res;
  }, {});
}

const appEntry = { main: resolve('./src/utils/index.js') };
const pagesEntry = getEntry(resolve('./src'), 'pages/**/main.js');
const entry = Object.assign({}, appEntry, pagesEntry);

module.exports = {
  entry: entry,
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /^main.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'mpvue',
      '@': resolve('src'),
    },
    symlinks: false,
  },
  plugins: [
    new CleanWebpackPlugin(resolve('dist')),
    new CopyWebpackPlugin([{
      from: resolve('./src'), to: resolve('./dist'), toType: 'dir', force: true,
    }]),
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist',
      files: ['./utils/settings.js'],
      rules: [{
        search: '$GIT_COUNT',
        replace: gitRevisionPlugin.version(),
      },
      {
        search: '$VERSION',
        replace: VERSION,
      }],
    }]),
  ],
};
