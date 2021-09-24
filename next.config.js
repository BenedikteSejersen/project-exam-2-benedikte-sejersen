const webpack = require('webpack')

module.exports = {
  reactStrictMode: true,
  externalsPresets: { web: false, webAsync: true },
  // async redirects() {
  //   return [
  //     {
  //       source: '/admin',
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ]
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
}


