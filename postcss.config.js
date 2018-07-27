const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [autoprefixer({ browsers: [
    'last 2 versions',
    'ios > 8',
    'Android > 4', // 4.1+
    'Safari > 6',  // 6.1+
  ] })],
}
