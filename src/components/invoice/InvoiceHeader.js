import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

import { InvoiceSubHeader } from './InvoiceSubHeader'
import { Colors } from '~/theme/Colors'

/**
 * Invoice Header Component
 */

export const InvoiceHeader = ({ clientNo, plan, expirationDate }) => {
  const { t } = useTranslation('invoice')

  const SUB_HEADERS = {
    clientNo: t('clientNo'),
    plan: t('plan'),
    expiration: t('expiration'),
  }

  return (
    <Container>
      <InvoiceSubHeader title={SUB_HEADERS.clientNo} subtitle={clientNo} />
      <InvoiceSubHeader title={SUB_HEADERS.plan} subtitle={plan} />
      <InvoiceSubHeader title={SUB_HEADERS.expiration} subtitle={expirationDate} />
    </Container>
  )
}

/*
 * PropTypes
 */

InvoiceHeader.propTypes = {
  clientNo: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
}

/*
 * Styles
 */

const Container = styled(View)({
  height: 80,
  padding: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: Colors.PATTENTS_BLUE,
})
