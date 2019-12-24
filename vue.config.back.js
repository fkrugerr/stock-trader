const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          API_URL: 'https://vue-http-2aacd.firebaseio.com/',
        },
      }),
    ],
  },
};
