/* eslint-disable no-console */
import { Navigation } from 'react-native-navigation'

import '~/i18n'
import { startLoginFlow, init as initNavigation, setDefaultNavigationOptions } from '~/navigation'
import { init as initNotifications, getDeviceToken } from '~/lib/notifications'
import { registerDeviceToken } from './api/auth'
import { getStoredAccessToken } from './lib/api-client'

initNavigation()
initNotifications()

getDeviceToken().then(async token => {
  const isLoggedIn = await getStoredAccessToken()

  if (token && isLoggedIn) {
    registerDeviceToken(token)
  }
})

Navigation.events().registerAppLaunchedListener(() => {
  setDefaultNavigationOptions()
  startLoginFlow()
})

console.disableYellowBox = true
