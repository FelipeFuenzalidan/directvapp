/* eslint-disable dot-notation */
/* eslint-disable camelcase */
import { values } from 'lodash'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import AsyncStorage from '@react-native-community/async-storage'
import Config from 'react-native-config'

const axios = require('axios').default

const AUTHORIZATION_TOKEN = 'x-auth-accesstoken'
const StorageKeys = {
  ACCESS_TOKEN: 'OMH_ACCESS_TOKEN',
  REFRESH_TOKEN: 'OMH_REFRESH_TOKEN',
}

const apiClientConfig = {
  baseURL: Config.MOBILE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'oracle-mobile-backend-id': Config.MOBILE_BACKEND_ID,
    Authorization: Config.MOBILE_BACKEND_AUTHORIZATION,
  },
}

/**
 * Exposed API client, used to call every service except to refresh tokens
 */
export const apiClient = axios.create(apiClientConfig)

/**
 * Internal API client, used only to refresh tokens
 * This one MUST NOT have set an access token, neither have interceptors
 */
const refreshTokenApiClient = axios.create(apiClientConfig)

/**
 * Axios authorization managament
 */
let currentAccessToken

function setClientAuthorizationToken(token) {
  apiClient.defaults.headers[AUTHORIZATION_TOKEN] = token
  currentAccessToken = token
}

export function getCurrentAccessToken() {
  return currentAccessToken
}

export async function getStoredAccessToken() {
  return AsyncStorage.getItem(StorageKeys.ACCESS_TOKEN)
}

// Set API client's access token
AsyncStorage.getItem(StorageKeys.ACCESS_TOKEN).then(setClientAuthorizationToken)

/**
 * 401 Status Code Interceptor
 */
async function handleUnauthorizedRequest(failedRequest) {
  try {
    const refreshToken = await AsyncStorage.getItem(StorageKeys.REFRESH_TOKEN)

    if (!refreshToken) {
      throw new Error('Refresh token is required to get new tokens')
    }

    const payload = { refresh_token: refreshToken }
    const { data } = await refreshTokenApiClient.post('/idm/refresh_token', payload)

    setClientAuthorizationToken(data.access_token)
    AsyncStorage.setItem(StorageKeys.ACCESS_TOKEN, data.access_token)
    // eslint-disable-next-line no-param-reassign
    failedRequest.response.config.headers[AUTHORIZATION_TOKEN] = data.access_token
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Error refreshing token', error)

    /**
     * TODO: here we should logout the user
     *
     * This would handle the case when refresh token is expired
     *
     * We should have an `init` method receiving callbacks for (at least):
     *    `logout` event, so we can navigate to Login screen
     */
  }
}

createAuthRefreshInterceptor(apiClient, handleUnauthorizedRequest)

/**
 * Exported methods
 */

export async function onUserLogout() {
  await AsyncStorage.multiRemove(values(StorageKeys))
  delete apiClient.defaults.headers[AUTHORIZATION_TOKEN]
}

export async function onUserAuthenticate(accessToken, refreshToken) {
  await AsyncStorage.multiSet([
    [StorageKeys.ACCESS_TOKEN, accessToken],
    [StorageKeys.REFRESH_TOKEN, refreshToken],
  ])

  setClientAuthorizationToken(accessToken)
}
