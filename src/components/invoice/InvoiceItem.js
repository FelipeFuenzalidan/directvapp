import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'

/**
 * Invoice Detail Component
 */

export const InvoiceItem = ({ description, paymentDue }) => {
  return (
    <Container>
      <StyledText>{description}</StyledText>
      <StyledText>{paymentDue}</StyledText>
    </Container>
  )
}

/*
 * PropTypes
 */

InvoiceItem.propTypes = {
  description: PropTypes.string.isRequired,
  paymentDue: PropTypes.string.isRequired,
}

/*
 * Styles
 */

const Container = styled(View)({
  marginVertical: 5,
  flexDirection: 'row',
  width: '93%',
  justifyContent: 'space-between',
})

const StyledText = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  fontSize: 15,
  maxWidth: '55%',
  color: Colors.BLACK,
  lineHeight: 25,
})
