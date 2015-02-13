var webpack = require('webpack');
var config = require('./config');

var env = config.get('env');

console.log("Environment is " + env);

// These options are common to the configuration for each environment
var commonConfig = {
  module: {
    loaders: [{
      test: /\.(?:js|jsx)$/, loader: "6to5-loader", exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__USERNAME__': JSON.stringify(config.get('username')),
      '__PASSWORD__': JSON.stringify(config.get('password')),
      '__PROFILE_URL__': JSON.stringify(config.get('getProfileUrl')),
      '__PICTURE_URL__': JSON.stringify(config.get('getPictureUrl')),
      '__SCHEDULE_URL__': JSON.stringify(config.get('getScheduleUrl'))
    })
  ]
};

var devConfig = {
  name: 'development',
  entry: {
    PSConnector: './index.js'
  },
  output: {
    libraryTarget: 'var',
    library: '[name]',
    path: './build',
    filename: '[name].js'
  },
  externals: commonConfig.externals,
  module: commonConfig.module,
  plugins: commonConfig.plugins
};
var prodConfig = {
  name: 'production',
  entry: {
    PSConnector: './index.js'
  },
  output: {
    libraryTarget: 'commonjs2',
    library: 'BlConnector',
    path: '.',
    filename: '[name].js'
  },
  externals: commonConfig.externals,
  module: commonConfig.module,
  plugins: commonConfig.plugins
};
var testConfig = {
  name: 'test',
  entry: {
    PSConnector: './index.js'
  },
  output: {
    libraryTarget: 'commonjs2',
    library: 'PSConnector',
    path: './test/build',
    filename: '[name].js'
  },
  externals: commonConfig.externals,
  module: commonConfig.module,
  plugins: commonConfig.plugins
};

// Exports a configuration that corresponds to the current environment
switch(env) {
  case 'development':
    module.exports = devConfig;
    break;
  case 'production':
    module.exports = prodConfig;
    break;
  case 'test':
    module.exports = testConfig;
    break;
}
