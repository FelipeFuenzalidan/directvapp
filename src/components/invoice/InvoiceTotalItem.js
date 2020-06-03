import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'

/**
 * Invoice Total Item Component
 */

export const InvoiceTotalItem = ({ paymentTotal }) => {
  const { t } = useTranslation('invoice.subtitle')
  return (
    <Container>
      <Subtitle>{t('total')}</Subtitle>
      <Subtitle>{paymentTotal}</Subtitle>
    </Container>
  )
}

/*
 * PropTypes
 */

InvoiceTotalItem.propTypes = {
  paymentTotal: PropTypes.string.isRequired,
}

/*
 * Styles
 */

const Container = styled(View)({
  padding: 20,
  backgroundColor: Colors.WHITE,
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const Subtitle = styled(Text)({
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 15,
  textTransform: 'uppercase',
  color: Colors.BLACK,
})
