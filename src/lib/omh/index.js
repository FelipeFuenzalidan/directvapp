/* eslint-disable no-console, import/no-default-export */
import { Platform } from 'react-native'
import mcs from 'mcs'
import { config } from './omh-config'
import { getDeviceInfo } from '../device-info'

mcs.init(config)

mcs.mobileBackend.setAuthenticationType(mcs.AUTHENTICATION_TYPES.basic)

export async function trackEvent(eventName) {
  await mcs.mobileBackend.analytics.logNamedEvent(eventName)
  await mcs.mobileBackend.analytics.flush()
}

/**
 * Policies
 */
const policiesPromise = mcs.mobileBackend.loadAppConfig()

export async function getPolicies() {
  const { data: policies } = await policiesPromise

  // TODO: get values based on country
  const formattedPolicies = {
    directvWebsiteBaseUrl: policies.URL_DIRECTV_SITE_AR,
    whatsappPhoneNumber: policies.WHATSAPP_PHONE_NUMBER_AR,
  }

  return formattedPolicies
}

export async function registerDevice(deviceToken) {
  if (!deviceToken) {
    console.log('No device token provided')
    return
  }

  const deviceInfo = await getDeviceInfo()
  await mcs.mobileBackend.authorization.authenticateAnonymous()

  try {
    await mcs.mobileBackend.notifications.registerForNotifications(
      deviceToken,
      deviceInfo.packageName,
      deviceInfo.appVersion,
      Platform.select({ android: 'FCM', ios: 'APNS' })
    )
    console.log('Successfully registed device in OMH')
  } catch (error) {
    console.log('Error registering device in OMH', error)
  }
}

export default mcs
