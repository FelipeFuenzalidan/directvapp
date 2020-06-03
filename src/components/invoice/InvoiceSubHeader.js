import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'

/**
 * Invoice Header Component
 */

export const InvoiceSubHeader = ({ title, subtitle }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}

/*
 * PropTypes
 */

InvoiceSubHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

/*
 * Styles
 */

const Container = styled(View)({
  height: '100%',
  marginVertical: 30,
  justifyContent: 'space-between',
})

const Title = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  fontSize: 13,
  color: Colors.NERO,
})

const Subtitle = styled(Text)({
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 14,
  textTransform: 'uppercase',
  color: Colors.NERO,
})
