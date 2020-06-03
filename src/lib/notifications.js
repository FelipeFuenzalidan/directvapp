/* eslint-disable no-console */
import { Notifications } from 'react-native-notifications'
import { handleIncomingNotification } from '../helpers/notifications'
import { registerDevice } from './omh'

let deviceTokenPromise

// This method always resolves
export function getDeviceToken() {
  if (!deviceTokenPromise) {
    console.error('Notifications module needs to be initialized to get device token')
    return Promise.resolve()
  }

  return deviceTokenPromise
}

export async function init() {
  Notifications.registerRemoteNotifications()

  deviceTokenPromise = new Promise(resolve => {
    Notifications.events().registerRemoteNotificationsRegistered(event => {
      // TODO: inspect why is being called twice
      console.warn('Device successfully registered for notifications', event)
      resolve(event.deviceToken)
      registerDevice(event.deviceToken)
    })

    Notifications.events().registerRemoteNotificationsRegistrationFailed(error => {
      console.warn('Error registering device for notifications', error)
      // TODO: track this error
      resolve()
    })
  })

  Notifications.events().registerNotificationOpened((notification, completion, action) => {
    console.log('Notification opened by user', notification)
    console.log('Notification opened with action', action)

    handleIncomingNotification(notification.payload)
    completion()
  })

  Notifications.events().registerNotificationReceivedForeground((_notification, completion) => {
    completion({ alert: true, sound: true, badge: false })
  })
}
