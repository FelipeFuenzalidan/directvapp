module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',

      {
        paths: [
          {
            rootPathPrefix: '~',
            rootPathSuffix: 'src',
          },
          {
            rootPathPrefix: 'mcs',
            rootPathSuffix: 'external_node_modules/mcs',
          },
        ],
      },
    ],
    'babel-plugin-styled-components',
  ],
}
