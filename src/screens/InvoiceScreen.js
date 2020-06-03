/* eslint-disable no-console */
import React, { useCallback } from 'react'
import { Alert } from 'react-native'

import { InvoiceView } from '~/views/InvoiceView'
import { useLastInvoice } from '~/hooks/invoice'
import { openInvoicePaymentWeb } from '~/lib/external-links'
import { openWhatsappWithText, Keywords } from '~/lib/whatsapp'
import { useLoggedUser } from '~/hooks/auth'

/**
 * Invoice Screen
 */

export const InvoiceScreen = () => {
  const { invoice, hasError, fetching: fetchingInvoice, refetch } = useLastInvoice()
  const { user, fetching: fetchingUser, refetch: refetchUser } = useLoggedUser()

  const handlePayInvoicePress = useCallback(() => {
    if (user?.id) {
      openInvoicePaymentWeb(user.id)
    }
  }, [user])

  const handleViewLastInvoicePress = useCallback(() => {
    Alert.alert('TODO: Ver Facturas Anteriores')
  }, [])

  const handleContactPress = useCallback(() => {
    openWhatsappWithText(Keywords.INVOICE)
  }, [])

  const handleSharePress = useCallback(() => {
    Alert.alert('TODO: Compartir Factura')
  }, [])

  const handlePullToRefresh = useCallback(() => {
    try {
      refetch()
      refetchUser()
    } catch (error) {
      // TODO: handle error properly
    }
  }, [refetch, refetchUser])

  return (
    <InvoiceView
      invoiceDetails={invoice}
      fetching={fetchingInvoice || fetchingUser}
      user={user}
      onPayInvoicePress={handlePayInvoicePress}
      errorOnInvoiceDetails={hasError}
      onViewLastInvoicesPress={handleViewLastInvoicePress}
      onContactPress={handleContactPress}
      onSharePress={handleSharePress}
      onPullToRefresh={handlePullToRefresh}
    />
  )
}

export default InvoiceScreen
