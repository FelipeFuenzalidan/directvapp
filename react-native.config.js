module.exports = {
  assets: ['./assets/fonts/'],
  dependencies: {
    'react-native-notifications': {
      platforms: {
        android: {
          sourceDir: './lib/android/app',
          packageInstance: 'new RNNotificationsPackage(getApplication())',
        },
      },
    },
  },
}
