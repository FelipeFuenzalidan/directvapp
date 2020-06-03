import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'
import { RoundButton } from '~/components/common/RoundButton'
import { LinkButton } from '~/components/common/LinkButton'

/**
 * Invoice Summary Component
 */

export const InvoiceSummary = ({
  totalAmount,
  paymentDueDate,
  onPayInvoicePress,
  onSeeDetailPress,
  alreadyPaid,
  automaticDebit,
}) => {
  const { t } = useTranslation('invoice')

  if (alreadyPaid) {
    return (
      <Container>
        <BigBody>¡Estás al dia con tus pagos!</BigBody>
      </Container>
    )
  }

  return (
    <Container>
      <LeftContainer>
        <Title>Tu última factura</Title>
        {paymentDueDate && <PaymentDueDate>Vence el {format(paymentDueDate, 'dd/MM')}</PaymentDueDate>}

        <PaymentTotalRow>
          {totalAmount && <PaymentTotal disabled={automaticDebit}>${totalAmount}</PaymentTotal>}
          <LinkButton text="Ver detalle" onPress={onSeeDetailPress} />
        </PaymentTotalRow>

        {automaticDebit && <AutomaticDebitAdhered>Estás adherido al débito automático</AutomaticDebitAdhered>}
      </LeftContainer>

      <RoundButton text={t('buttons.pay')} onPress={onPayInvoicePress} />
    </Container>
  )
}

/*
 * PropTypes
 */

InvoiceSummary.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  paymentDueDate: PropTypes.instanceOf(Date).isRequired,
  onPayInvoicePress: PropTypes.func,
  onSeeDetailPress: PropTypes.func,
  alreadyPaid: PropTypes.bool,
  automaticDebit: PropTypes.bool,
}

InvoiceSummary.defaultProps = {
  onPayInvoicePress: () => {},
  onSeeDetailPress: () => {},
  alreadyPaid: true,
  automaticDebit: true,
}

/*
 * Styles
 */

const Container = styled(View)({
  padding: 20,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const LeftContainer = styled(View)({
  flex: 1,
})

const BigBody = styled(Text)({
  flex: 1,
  fontFamily: Fonts.dtvcurve.italicLight,
  color: Colors.GREY,
  fontSize: 24,
  textAlign: 'center',
})

const Title = styled(Text)({
  fontFamily: Fonts.dtvcurve.bold,
  color: Colors.BLACK,
  fontSize: 15,
})

const PaymentTotalRow = styled(View)({
  flexDirection: 'row',
  marginTop: 5,
  alignItems: 'baseline',
})

const PaymentDueDate = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  color: Colors.GREY,
  fontSize: 14,
})

const AutomaticDebitAdhered = styled(Text)({
  fontFamily: Fonts.dtvcurve.italicRegular,
  color: Colors.GREY,
  fontSize: 14,
})

const PaymentTotal = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  fontSize: 26,
  color: props => (props.disabled ? Colors.GREY : Colors.BLACK),
  textTransform: 'uppercase',
  marginRight: 10,
})
