import mcs from 'mcs'
import Config from 'react-native-config'

export const config = {
  logLevel: mcs.LOG_LEVEL.VERBOSE,
  logHTTP: true,
  disableAnalyticsLocation: true,
  mobileBackend: {
    name: 'ECMOBBKD_DEV',
    baseUrl: Config.MOBILE_BACKEND_BASE_URL.replace('/mobile/custom', ''),
    authentication: {
      type: mcs.AUTHENTICATION_TYPES.basic,
      basic: {
        mobileBackendId: Config.MOBILE_BACKEND_ID,
        anonymousKey: Config.MOBILE_BACKEND_AUTHORIZATION.replace('Basic ', ''),
      },
    },
  },
}
