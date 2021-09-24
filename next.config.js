const webpack = require('webpack')

module.exports = {
  reactStrictMode: true,
  externalsPresets: { web: false, webAsync: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
}


