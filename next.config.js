const webpack = require('webpack')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
    // domains: ["a.storyblok.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}


