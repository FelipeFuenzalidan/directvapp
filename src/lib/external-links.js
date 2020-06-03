import { Linking } from 'react-native'
import { getPolicies } from './omh'

export async function openInvoicePaymentWeb(clientId) {
  const { directvWebsiteBaseUrl } = await getPolicies()

  return Linking.openURL(
    `${directvWebsiteBaseUrl}/midirectv/Payment/AuthenticatePayemntsUser?type=Id&value=${clientId}&source=PublicSite`
  )
}

export async function openRechargeWeb(smartCardId) {
  const { directvWebsiteBaseUrl } = await getPolicies()

  return Linking.openURL(
    `${directvWebsiteBaseUrl}/midirectv/Payment/AuthenticatePayemntsUser?type=SmartCard&value=${smartCardId}&source=PublicSite`
  )
}
