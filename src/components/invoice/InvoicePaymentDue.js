import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'
import { RoundButton } from '../common/RoundButton'

/**
 * Invoice Payment Due Component
 */

export const InvoicePaymentDue = ({ paymentTotal, paymentDueDate, onPayInvoicePress }) => {
  const { t } = useTranslation('invoice')

  return (
    <Container>
      <View>
        <PaymentDueDate>{paymentDueDate}</PaymentDueDate>
        <PaymentTotal>{paymentTotal}</PaymentTotal>
      </View>
      <RoundButton text={t('buttons.pay')} onPress={onPayInvoicePress} />
    </Container>
  )
}

/*
 * PropTypes
 */

InvoicePaymentDue.propTypes = {
  paymentTotal: PropTypes.string.isRequired,
  paymentDueDate: PropTypes.string.isRequired,
  onPayInvoicePress: PropTypes.func,
}

InvoicePaymentDue.defaultProps = {
  onPayInvoicePress: () => {},
}

/*
 * Styles
 */

const Container = styled(View)({
  padding: 20,
  backgroundColor: Colors.WHITE,
  elevation: 5,
  shadowColor: Colors.NERO,
  shadowOpacity: 0.16,
  shadowRadius: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const PaymentDueDate = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  color: Colors.NERO,
  fontSize: 13,
  textTransform: 'uppercase',
})

const PaymentTotal = styled(Text)({
  fontFamily: Fonts.dtvcurve.bold,
  fontSize: 24,
  color: Colors.NERO,
})
