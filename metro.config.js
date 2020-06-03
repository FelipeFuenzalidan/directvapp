const path = require('path')
const blacklist = require('metro-config/src/defaults/blacklist')

const isStorybook = process.env.STORYBOOK === 'true'
const excludeStorybookPaths = [/index\.android\.js/, /index\.ios\.js/]

module.exports = {
  resolver: {
    blacklistRE: blacklist(isStorybook ? [] : excludeStorybookPaths),
    extraNodeModules: {
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
}
