import { Linking } from 'react-native'
import { format } from 'date-fns'
import { getPolicies } from '~/lib/omh'
import { getLoggedUser } from '~/api/auth'

export async function getWhatsappLink(keyword) {
  const { whatsappPhoneNumber } = await getPolicies()
  const loggedUser = await getLoggedUser()

  const CIU = loggedUser.customerId
  const OWNER = 'ECMOBFTD' // TODO: should we get this from policies?
  const UCID = format(new Date(), 'ddMMyyyy24hhmmss')

  return `https://wa.me/${whatsappPhoneNumber}?text=CIU=${CIU}|OWNER=${OWNER}|Text=${keyword}|UCID=${UCID}`
}

export async function openWhatsappWithText(keyword) {
  const whatsappLink = await getWhatsappLink(keyword)
  Linking.openURL(whatsappLink)
}

export const Keywords = {
  CSRDIGITAL: 'CSRDIGITAL',
  INVOICE: 'FACTURA',
}
