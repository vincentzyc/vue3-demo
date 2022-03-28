const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    autoprefixer(),
    px2rem({ rootValue: 50, propList: ['*'] })
  ]
};
