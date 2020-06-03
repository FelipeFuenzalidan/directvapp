import { Platform } from 'react-native'
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage'

import { apiClient, onUserAuthenticate, onUserLogout, getCurrentAccessToken } from '~/lib/api-client'
import { getDeviceInfo } from '~/lib/device-info'
import { getDeviceToken } from '~/lib/notifications'

const ID_TOKEN_STORAGE_KEY = 'OMH_ID_TOKEN'

let userInfo, idToken

function setIdToken(newIdToken) {
  idToken = newIdToken
  userInfo = idToken ? jwtDecode(idToken) : null
  return userInfo
}

const loadIdTokenPromise = AsyncStorage.getItem(ID_TOKEN_STORAGE_KEY).then(setIdToken)

/**
 * Exported methods
 */

export async function login(username, password) {
  const deviceInfo = await getDeviceInfo()

  const headers = {
    'x-device-id': deviceInfo.uniqueId,
    'x-device-token': await getDeviceToken(),
    'x-device-platform': Platform.OS,
  }
  const payload = { username, password }
  const { data } = await apiClient.post('/idm/access_token', payload, { headers })
  await onUserAuthenticate(data.access_token, data.refresh_token)

  AsyncStorage.setItem(ID_TOKEN_STORAGE_KEY, data.id_token)
  return setIdToken(data.id_token)
}

export async function logout() {
  AsyncStorage.removeItem(ID_TOKEN_STORAGE_KEY)

  const deviceInfo = await getDeviceInfo()

  const headers = {
    'x-device-id': deviceInfo.uniqueId,
    'x-device-token': await getDeviceToken(),
  }
  const payload = { token: getCurrentAccessToken() }
  await apiClient.post('/idm/revoke_token', payload, { headers })

  await onUserLogout()
}

export async function registerDeviceToken(token) {
  const deviceInfo = await getDeviceInfo()

  const headers = {
    'x-device-id': deviceInfo.uniqueId,
    'x-device-token': token,
    'x-device-platform': Platform.OS,
  }
  return apiClient.put('/idm/register-device', null, { headers })
}

export async function getLoggedUser() {
  // This prevents getting the user info BEFORE the data is loaded from AsyncStorage
  await loadIdTokenPromise
  return userInfo
}

export async function getUserData() {
  await loadIdTokenPromise
  if (!idToken) {
    throw new Error('Not logged user')
  }

  const headers = { 'x-auth-idtoken': idToken }

  const { data } = await apiClient.get('/customer360view/me', { headers })

  return data.customer
}
